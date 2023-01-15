import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AuthForm from "../features/auth/AuthForm";
import AllProducts from "../features/product/Products";
import { Product } from "../features/product/Product";
import Checkout from "../features/checkout/Checkout";
import { me } from "./store";
import Users from "../features/users/Users";
import { CartView } from "../features/cart/CartView";
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
					<Route path="/*" element={<AllProducts />} />
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
						element={<CartView name="cart" displayName="Cart" />}
					/>
					<Route
						path="/users"
						element={<Users name="users" displayName="All users" />}
					/>
					<Route
						path="/checkout"
						element={<Checkout name="checkout" displayName="checkout" />}
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
						element={<CartView name="cart" displayName="Cart" />}
					/>
				</Routes>
			)}
		</div>
	);
};

export default AppRoutes;
