import React from 'react'
import Cart from './Cart'
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectCart } from './cartSlice';
export const CartView = () => {
  const cart = useSelector(selectCart)
  return (
    <div>
      <Cart />
      <br />
      {cart.length ? <Link to="/checkout">
        <button className="checkoutButton">GO TO CHECKOUT</button>
      </Link> :
        <div className='emptyCart'>
          <h1>Uh oh!</h1>
          <h2>Looks like your carts empty!</h2>
          <Link to="/products">
          <button className="keepShoppingButton">Click here to keep shopping</button>
        </Link>
        </div>
        }
    </div>
  )
}
