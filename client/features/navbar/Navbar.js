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
			<h1>Grace Shopper Store</h1>
			<nav>
				{" "}
				{isAdmin ? (
					<div>
						<AdminNavbar />
					</div>
				) : null}
			</nav>
			<nav>
				{isLoggedIn ? (
					<div>
						{/* The navbar will show these links after you log in */}
						<Link to="/products" onClick={onLogout}>
							Logout
						</Link>
						<Link to="/products">Products</Link>
						<Link to="/cart">Cart:{cartQuantity}</Link>
						{email}
					</div>
				) : (
					<div>
						{/* The navbar will show these links before you log in */}
						<Link to="/login">Login</Link>
						<Link to="/signup">Sign Up</Link>
						<Link to="/products">Products</Link>
						<Link to="/cart">Cart:{cartQuantity}</Link>
					</div>
				)}
			</nav>
			<hr />
		</div>
	);
};

export default Navbar;
