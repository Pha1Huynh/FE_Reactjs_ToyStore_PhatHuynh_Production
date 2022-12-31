import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Header.scss';
import { faShoppingCart, faCoffee, Shopp } from '@fortawesome/free-solid-svg-icons';
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="header-container">
        <div className="content-left">
          <div className="header-logo">ToyStore</div>
          <ul className="header-menu">
            <li className="header-menu-item">Catalog</li>
            <li className="header-menu-item">Delivery</li>
            <li className="header-menu-item">About</li>
            <li className="header-menu-item">Contacts</li>
          </ul>
        </div>
        <div className="content-right">
          <p className="header-cart">
            Cart{' '}
            <p className="header-icon-cart">
              <FontAwesomeIcon icon={faShoppingCart} size="lg" />
            </p>
          </p>
          <p className="header-count">10</p>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { dataRedux: state.users };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
