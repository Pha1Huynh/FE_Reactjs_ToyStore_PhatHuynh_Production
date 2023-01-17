import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '~/components/Header/Header';
import Footer from '~/components/Footer/Footer';
import './CartPage.scss';
import CartItem from '~/components/CartItem/CartItem';
import nocart from '~/assets/images/backgound/nocart.png';
import * as actions from '~/store/actions';
class CartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartEmpty: false,
      quantity: 0,
    };
  }
  async componentDidMount() {
    // await this.props.getCartByUserId();
    window.scrollTo(0, 0);
  }
  async componentDidUpdate(prevProps, prevStates) {
    if (prevProps.cartByUserId !== this.props.cartByUserId) {
      // await this.props.getCartByUserId();
    }
  }
  render() {
    let { cartByUserId } = this.props;
    let { cartEmpty } = this.state;

    return (
      <>
        <Header />
        {/* <div className="cart-page-container">
          <div className="cart-page-content">
            {cartByUserId.length > 0 ? (
              <div className="cart-list">
                {cartByUserId &&
                  cartByUserId.map((item, index) => {
                    return <CartItem {...item.toyData} number={item.number} key={index} />;
                  })}

                <div className="pay">
                  <p className="price">Total: $ 30.00</p>
                  <button className="btn btn-primary btn-lg">Pay</button>
                </div>
              </div>
            ) : (
              <div className="no-cart">
                <img src={nocart} alt="" />
                <p className="no-cart-message">Your cart is empty</p>
              </div>
            )}
          </div>
          <div className="cart-page-footer">
            <Footer />
          </div>
        </div> */}
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return { cartByUserId: state.client.cartByUserId };
};
const mapDispatchToProps = (dispatch) => {
  return { getCartByUserId: () => dispatch(actions.fetchCartByUserId()) };
};
export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
