import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "../features/navbar/Navbar";
import AppRoutes from "./AppRoutes";
import { selectAuth } from "../features/auth/authSlice.js";
import { fetchCartAsync, selectCart } from "../features/cart/cartSlice";

const App = () => {
	const { id } = useSelector(selectAuth);
	const dispatch = useDispatch();
	const cart = useSelector(selectCart);
	console.log(cart, "app wide cart");
	useEffect(() => {
    if(id)dispatch(fetchCartAsync(id));
	}, [dispatch,id]);
	return (
		<div>
			<Navbar />
			<AppRoutes />
		</div>
	);
};

export default App;
