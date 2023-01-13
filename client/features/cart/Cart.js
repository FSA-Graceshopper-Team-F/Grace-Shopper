import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductsAsync, selectProducts } from "../product/productSlice";
import { selectCart, increaseQuantity, decreaseQuantity } from "./cartSlice";

const Cart = () => {
	const dispatch = useDispatch();
	const allProducts = useSelector(selectProducts);
	const cart = useSelector(selectCart);

	useEffect(() => {
		dispatch(fetchProductsAsync());
		console.log(cart, "use effect cart");
	}, [dispatch, cart]);

	if (allProducts.length === 0) return null;

	const getProductById = (id) =>
		allProducts.find((product) => product.id === id);

	const cartProducts = cart.map((item) => ({
		...item,
		...getProductById(item.productId),
	}));

	const totalCartPrice = cartProducts.reduce(
		(total, { price, quantity }) => total + price * quantity,
		0
	);

	const handleIncreaseQuantity = (item) => {
		dispatch(increaseQuantity({ productId: item.id }));
	};

	const handleDecreaseQuantity = (item) => {
		dispatch(decreaseQuantity({ productId: item.id }));
	};

	return (
		<div className="cart">
			<ul>
				{cartProducts.map((item) => (
					<li key={`Cart item ${item.id}`}>
						{item.name} {item.price} Qty:{item.quantity} ItemTotal:
						{item.price * item.quantity}
						<button onClick={() => handleIncreaseQuantity(item)}>
							I WANT MORE
						</button>
						<button onClick={() => handleDecreaseQuantity(item)}>
							I WANT LESS
						</button>
					</li>
				))}
				Total Price: {totalCartPrice}
			</ul>
		</div>
	);
};

export default Cart;
