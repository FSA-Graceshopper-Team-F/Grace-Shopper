import React from 'react';
import { useSelector } from 'react-redux';

const CartIcon = () => {
  const cart = useSelector(state => state.cart);
  return (
    <div className="cart-icon">
      <img src={require('/public/shopping-cart.png')} alt="cart icon" />
      <span className="total-quantity">{cart}</span>
    </div>
  );
};

export default CartIcon;