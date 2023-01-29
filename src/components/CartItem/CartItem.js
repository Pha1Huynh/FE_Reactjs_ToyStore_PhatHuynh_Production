import './CartItem.scss';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '~/store/actions';
import './CartItemResponsive.scss';
function CartItem(props) {
  let number = props.number ? props.number : '';
  let { userInfo, handleAddItemToCart, handleDeleteItemFromCart } = props;
  const [quantity, setQuantity] = useState(number);
  useEffect(() => setQuantity(number), [number]);
  return (
    <div className="cart-item-container">
      <p className="image">
        <img className="cart-item-img" src={props.image} alt="img" />
      </p>
      <div className="cart-item-info">
        <p className="cart-item-name">{props.name}</p>
        <p className="cart-item-price">$ {props.price}.00</p>
        <p className="cart-item-delete" onClick={() => deleteItem(props.id, handleDeleteItemFromCart)}>
          Remove
        </p>
      </div>
      <div className="cart-item-quantity">
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          onBlur={() =>
            handleOnBlurInput(quantity, number, props.id, userInfo, handleAddItemToCart, handleDeleteItemFromCart)
          }
        />
      </div>
    </div>
  );
}
const handleOnBlurInput = async (quantity, number, toyId, userInfo, handleAddItemToCart, handleDeleteItemFromCart) => {
  if (quantity && number && toyId && userInfo && userInfo.id && handleAddItemToCart && handleDeleteItemFromCart) {
    let newNumber = +quantity - +number;
    if (+quantity <= 0) {
      await handleDeleteItemFromCart(toyId);
    } else {
      await handleAddItemToCart({
        userId: userInfo.id,
        toyId: toyId,
        cartStatusId: 'S1',
        number: newNumber,
      });
    }
  }
};
const deleteItem = async (toyId, handleDeleteItemFromCart) => {
  if (toyId && handleDeleteItemFromCart) {
    await handleDeleteItemFromCart(toyId);
  }
};
const mapStateToProps = (state) => {
  return { userInfo: state.auth.userInfo };
};
const mapDispatchToProps = (dispatch) => {
  return {
    handleAddItemToCart: (data) => dispatch(actions.handleAddItemToCart(data)),
    handleDeleteItemFromCart: (toyId) => dispatch(actions.handleDeleteItemFromCart(toyId)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
