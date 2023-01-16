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
			),
		};
	});

	return (
		<div>
			OrderHistory
			<hr />
			{orderHistory && orderHistory.length ? (
				orderDetails.map((order) => (
					<div key={`orderId ${order.id}`}>
						<span>Order Number: {order.id}</span>
						<br />
						<span>Order Total: ${order.total}.00</span>
						{order.productDetails.map((product) => (
							<ul key={`product ${product.id}`}>
								{product.name}
								<li>Price: {product.price}</li>
								<li>Qty: {product.quantity}</li>
								<li>Item Total: ${product.quantity * product.price}.00</li>
							</ul>
						))}
						<hr />
					</div>
				))
			) : (
				<div>You have no orders</div>
			)}
		</div>
	);
};
