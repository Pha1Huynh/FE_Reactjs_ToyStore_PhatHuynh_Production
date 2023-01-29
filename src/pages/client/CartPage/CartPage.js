import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '~/components/Header/Header';
import Footer from '~/components/Footer/Footer';
import './CartPage.scss';
import CartItem from '~/components/CartItem/CartItem';
import nocart from '~/assets/images/backgound/nocart.png';
import './CartPageResponsive.scss';
import * as actions from '~/store/actions';
import Loading from '../Loading/Loading';
import { Navigate } from 'react-router-dom';
class CartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartEmpty: false,
      price: 0,
      loading: true,
    };
  }
  async componentDidMount() {
    window.scrollTo(0, 0);
    let res = await this.props.getCartByUserId('');

    if (res && res.errCode === 0) {
      let sumPrice = this.sumPrice();
      this.setState({
        loading: false,
        price: sumPrice,
      });
    }
  }
  async componentDidUpdate(prevProps, prevStates) {
    if (prevProps.cartByUserId !== this.props.cartByUserId) {
      let sumPrice = this.sumPrice();
      this.setState({
        price: sumPrice,
      });
    }
  }
  sumPrice = () => {
    let { cartByUserId } = this.props;

    const sumPrice =
      cartByUserId &&
      cartByUserId.length > 0 &&
      cartByUserId.reduce(
        (accumulator, currentValue) => accumulator + +currentValue.toyData.price * +currentValue.number,
        0,
      );

    return sumPrice;
  };
  render() {
    let { cartByUserId, handlePayItemFromCart, tokens } = this.props;
    let { price, loading } = this.state;
    if (tokens && tokens.accessToken && tokens.refreshToken) {
      return <Navigate replace to="/" />;
    } else {
      return (
        <>
          {loading === true ? (
            <Loading />
          ) : (
            <>
              <Header />
              <div className="cart-page-container">
                <div className="cart-page-content">
                  {cartByUserId.length > 0 ? (
                    <div className="cart-list">
                      {cartByUserId &&
                        cartByUserId.map((item, index) => {
                          return <CartItem {...item.toyData} number={item.number} key={index} />;
                        })}

                      <div className="pay">
                        <p className="price">Total: $ {price}.00</p>
                        <button className="btn btn-primary btn-lg" onClick={async () => await handlePayItemFromCart()}>
                          Pay
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="no-cart">
                      <img src={nocart} alt="" />
                      <p className="no-cart-message">Your cart is empty</p>
                    </div>
                  )}
                </div>
              </div>
              <Footer />
            </>
          )}
        </>
      );
    }
  }
}
const mapStateToProps = (state) => {
  return { cartByUserId: state.client.cartByUserId, tokens: state.auth.tokens };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getCartByUserId: () => dispatch(actions.fetchCartByUserId()),
    handlePayItemFromCart: (type) => dispatch(actions.handlePayItemFromCart(type)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
