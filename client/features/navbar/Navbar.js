import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout,reset } from '../auth/authSlice';
import { clearCartOnLogout, selectCart } from '../cart/cartSlice';
const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const cart = useSelector(selectCart)
  const dispatch = useDispatch();

  const cartQuantity = cart.length ? cart.reduce((total, {quantity})=> total+ quantity,0) : null
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    dispatch(clearCartOnLogout())
  };

  return (
    <div>
      <h1>FS-App-Template</h1>
      <nav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <Link to="/home" onClick={onLogout}>Logout</Link>
            <Link to="/cart">Cart:{cartQuantity}</Link>
            <Link to="/products">Products</Link>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/cart">Cart:{cartQuantity}</Link>
            <Link to="/products">Products</Link>
          </div>
        )}
      </nav>
      <hr />
    </div>
  );
};

export default Navbar;
