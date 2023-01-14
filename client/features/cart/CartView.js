import React from 'react'
import Cart from './Cart'
import { Link } from "react-router-dom";
export const CartView = () => {
  return (
    <div><Cart/><br/>
    <Link to="/checkout"><button>GO TO CHECKOUT</button></Link></div>
  )
}
