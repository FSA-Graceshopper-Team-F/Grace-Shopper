import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductsAsync, selectProducts } from "../product/productSlice";
import { selectCart } from "./cartSlice";

const Cart = () => {
	const dispatch = useDispatch();
	const allProducts = useSelector(selectProducts);
	const cart = useSelector(selectCart);
	const getProductById = (id) =>
		allProducts.find((product) => product.id === id);

	const cartProducts = cart.map((item) => ({
		...item,
		...getProductById(item.productId),
	}));

	const cartPerItemTotalPrice = cartProducts.map((item) => {
		return item.price * item.quantity;
	});
	const totalCartPrice = cartPerItemTotalPrice.reduce((a, b) => a + b, 0);
	
	useEffect(() => {
		dispatch(fetchProductsAsync());
	}, [dispatch]);

	return (
		<div className="cart">
			<ul>
				{cartProducts.map((item) => (
					<li key={`Cart item ${item.id}`}>
						{item.name} {item.price} Qty:{item.quantity} ItemTotal:
						{item.price * item.quantity}
					</li>
				))}
				Total Price: {totalCartPrice}
			</ul>
		</div>
	);
};

export default Cart;
