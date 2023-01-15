import React from 'react'
import Cart from './Cart'
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectCart } from './cartSlice';
export const CartView = () => {
  const cart = useSelector(selectCart)
  return (
    <div><Cart/><br/>
    {cart.length ? <Link to="/checkout"><button>GO TO CHECKOUT</button></Link> : <Link to ="/products"><button>KEEP SHOPPING</button></Link>}</div>
  )
}
