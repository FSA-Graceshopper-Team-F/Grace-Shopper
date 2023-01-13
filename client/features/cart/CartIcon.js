import React from 'react';
import { useSelector } from 'react-redux';

const CartIcon = () => {
  const { items } = useSelector(state => state.cart);
  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="cart-icon">
      <img src={require('./shopping-cart.svg')} alt="cart icon" />
      <span className="total-quantity">{totalQuantity}</span>
    </div>
  );
};

export default CartIcon;