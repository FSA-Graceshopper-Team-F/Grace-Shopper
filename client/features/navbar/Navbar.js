import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, reset, selectAuth } from "../auth/authSlice";
import { clearCartOnLogout, selectCart } from "../cart/cartSlice";
import { resetUsers } from "../users/usersSlice";
import { AdminNavbar } from "./AdminNavbar";
const Navbar = () => {
	const isLoggedIn = useSelector((state) => !!state.auth.me.id);
	const { isAdmin, email } = useSelector(selectAuth);
	const cart = useSelector(selectCart);
	const dispatch = useDispatch();
	const cartQuantity = cart.length
		? cart.reduce((total, { quantity }) => total + quantity, 0)
		: 0;
	const onLogout = () => {
		dispatch(logout());
		dispatch(reset());
		dispatch(clearCartOnLogout());
		if(isAdmin){
			dispatch(resetUsers())
		}
	};

	return (
		<div>
			<Link to="/"><h1 className="logoTitle">Grace Shopper Store</h1></Link>
			
			<nav className="navBar">
				{" "}
				{isAdmin ? (
					<div>
						<AdminNavbar />
					</div>
				) : null}
			</nav>
			<nav className="navBar">
				{isLoggedIn ? (
					<div className="linksFrame">
						{/* The navbar will show these links after you log in */}
						
						<Link to="/">Home</Link>
						<Link to="/products">Products</Link>
						
						<Link className="logOutLink" to="/products" onClick={onLogout}>
							Logout
						</Link>
						<Link className="cartLink" to="/cart">Cart:{cartQuantity}</Link>
						<Link className="profileLink" to="/myProfile">Profile</Link>
						<Link className="ordersLink" to="/myOrders">My Orders</Link>
					</div>
				) : (
					<div className="linksFrame">
						{/* The navbar will show these links before you log in */}
						
						<Link to="/signup">Sign Up</Link>
						<Link to="/products">Products</Link>
						<Link className="cartLink" to="/cart">Cart:{cartQuantity}</Link>
						<Link className="loginLink" to="/login">Login</Link>
					</div>
				)}
			</nav>
			<hr />
		</div>
	);
};

export default Navbar;
