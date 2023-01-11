import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AuthForm from "../features/auth/AuthForm";
import Home from "../features/home/Home";
import AllProducts from "../features/product/Products";
import { Product } from "../features/product/Product";
import { me } from "./store";
import Cart from "../features/cart/Cart";
import Users from "../features/users/Users";

/**
 * COMPONENT
 */

const AppRoutes = () => {
	const isLoggedIn = useSelector((state) => !!state.auth.me.id);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(me());
	}, []);

	return (
		<div>
			{isLoggedIn ? (
				<Routes>
					<Route path="/*" element={<Home />} />
					<Route to="/home" element={<Home />} />
					<Route
						path="/products"
						element={<AllProducts name="products" displayName="All Products" />}
					/>
					<Route
						path="/products/:productId"
						element={<Product name="product" displayName="Product" />}
					/>
					<Route
						path="/cart"
						element={<Cart name="cart" displayName="Cart"/>}
            	/>
          <Route
						path="/users"
						element={<Users name="users" displayName="All users" />}
					    />
				</Routes>
			) : (
				<Routes>
					<Route
						path="/*"
						element={<AuthForm name="login" displayName="Login" />}
					/>
					<Route
						path="/login"
						element={<AuthForm name="login" displayName="Login" />}
					/>
					<Route
						path="/signup"
						element={<AuthForm name="signup" displayName="Sign Up" />}
					/>
					<Route
						path="/products"
						element={<AllProducts name="products" displayName="All Products" />}
					/>
					<Route
						path="/products/:productId"
						element={<Product name="product" displayName="Product" />}
					/>
					<Route
						path="/cart"
						element={<Cart name="cart" displayName="Cart"/>}
					/>
				</Routes>
			)}
		</div>
	);
};

export default AppRoutes;
