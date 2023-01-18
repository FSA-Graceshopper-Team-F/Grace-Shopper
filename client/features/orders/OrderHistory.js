import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderHistoryAsync, selectOrders } from "./orderSlice";
export const OrderHistory = () => {
	const dispatch = useDispatch();
	const orderHistory = useSelector(selectOrders);
	useEffect(() => {
		dispatch(fetchOrderHistoryAsync());
	}, [dispatch]);

	const orderDetails = orderHistory.map((orders) => {
		return {
			...orders,
			total: orders.productDetails.reduce(
				(total, product) => total + product.quantity * product.price,
				0
			)
		}; 
	}) 

	return (
		<div className="OrderHistory">
			<span>Your Orders</span>
			<hr />
			{orderHistory && orderHistory.length ? (
				orderDetails.map((order) => (
					<div className="singleOrderHistory" key={`orderId ${order.id}`}>
						<h2>Order Number: {order.id}</h2>
						<br />
						<h2>Order Total: ${order.total}.00</h2>
						{order.productDetails.map((product) => (
							<ul key={`product ${product.id}`}>
								<h1>{product.name}</h1>
								<li>Price: {product.price}</li>
								<li>Qty: {product.quantity}</li>
								<li>Item Total: ${product.quantity * product.price}.00</li>
							</ul>
						))}
						
					</div>
				))
			) : (
				<div>You have no orders</div>
			)}
		</div>
	);
};
