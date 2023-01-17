import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteToken } from '~/utils/token';
import * as actions from '~/store/actions';
import './Header.scss';
import { faShoppingCart, faRightToBracket, faUser, faBars } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import './HeaderResponsive.scss';
dayjs.locale('vi');
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: ' ',
      isShowHeaderMenu: false,
    };
  }
  async componentDidMount() {
    await this.props.getCartByUserId();
    let sumQuantity = this.sumQuantity();
    this.setState({
      quantity: sumQuantity,
    });
  }
  async componentDidUpdate(prevProps, prevStates) {
    if (this.props.cartByUserId !== prevProps.cartByUserId) {
      let sumQuantity = this.sumQuantity();
      this.setState({
        quantity: sumQuantity,
      });
    }
  }
  handleLogout = async () => {
    let { handleLogoutAction, tokens } = this.props;
    await handleLogoutAction({ refreshToken: tokens.refreshToken });
    deleteToken();
  };

  sumQuantity = () => {
    let { cartByUserId } = this.props;

    const sumQuantity =
      cartByUserId &&
      cartByUserId.length > 0 &&
      cartByUserId.reduce((accumulator, currentValue) => accumulator + +currentValue.number, 0);
    return sumQuantity;
  };
  render() {
    let { tokens, userInfo, cartByUserId } = this.props;

    let { quantity, isShowHeaderMenu } = this.state;

    return (
      <div className="header-container">
        <div className="header-content">
          <p className="header-icon-menu" onClick={() => this.setState({ isShowHeaderMenu: !isShowHeaderMenu })}>
            <FontAwesomeIcon icon={faBars} />
          </p>
          <div className={isShowHeaderMenu ? 'content-left active' : 'content-left'}>
            <Link to="/" className="header-logo">
              ToyStore
            </Link>
            <ul className="header-menu">
              <li className="header-menu-item">Catalog</li>
              <li className="header-menu-item">Delivery</li>
              <li className="header-menu-item">About</li>
              <li className="header-menu-item">Contacts</li>
            </ul>
          </div>
          {tokens && tokens.refreshToken ? (
            <div className="content-right">
              <p className="header-user">
                <div className="dropdown">
                  <p className="">
                    <FontAwesomeIcon icon={faUser} />
                  </p>
                  <div className="dropdown-content">
                    {userInfo && userInfo.roleId === 'A' && (
                      <Link to="/admin" className="dropdown-link">
                        Admin
                      </Link>
                    )}
                    <p className="dropdown-link">User Account</p>
                    <p className="dropdown-link" onClick={() => this.handleLogout()}>
                      Logout
                    </p>
                  </div>
                </div>
              </p>
              <p className="header-cart">
                <Link to={userInfo && userInfo.id && `/cart-page/${userInfo.id}`} className="header-icon-cart">
                  <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                </Link>
              </p>
              {quantity ? <p className="header-count">{quantity}</p> : ''}
            </div>
          ) : (
            <div className="content-right">
              <p className="header-cart">
                Login{' '}
                <Link to="/login-and-register">
                  <p className="header-icon-cart">
                    <FontAwesomeIcon icon={faRightToBracket} size="lg" />
                  </p>
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { tokens: state.auth.tokens, userInfo: state.auth.userInfo, cartByUserId: state.client.cartByUserId };
};
const mapDispatchToProps = (dispatch) => {
  return {
    handleLogoutAction: (refreshToken) => dispatch(actions.handleLogout(refreshToken)),
    getCartByUserId: () => dispatch(actions.fetchCartByUserId()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
