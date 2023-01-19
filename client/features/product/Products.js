import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { selectAuth } from "../auth/authSlice";
import DeleteButton from "./DeleteButton";
import { SortingSelector } from "./SortingSelector";
import { SearchBar } from "./SearchBar";
import axios from "axios";

const AllProducts = () => {
	const scrollElement = useRef();
	const { isAdmin } = useSelector(selectAuth);
	const [page, setPage] = useState(1);
	const [products, setProducts] = useState([]);
	const [pageToGet, setPageToGet] = useState(1);
	const [loading, setLoading] = useState(false);
	const [intersecting, setIntersecting] = useState(false);
	const [noMorePages, setNoMorePages] = useState(false);

	useEffect(() => {
		function fetchNextPage() {
			setLoading(true);
			const params = {
				page: pageToGet,
				page_size: 10,
			};
			if (noMorePages) return null;
			axios
				.get("/api/products", { params })
				.then((res) => {
					if (res.data.length) {
						setProducts((products) => [...products, ...res.data]);
					} else {
						setNoMorePages(true);
					}
				})
				.then(() => setPageToGet((page) => page + 1))
				.finally(() => setLoading(false));
		}

		const intersectionObserver = new IntersectionObserver((entries) => {
			const entry = entries[0];
			if (entry.isIntersecting) setIntersecting(true);
			return setIntersecting(entry.isIntersecting);
		});

		intersectionObserver.observe(scrollElement.current);

		if (intersecting) fetchNextPage();

	}, [intersecting]);

	return (
		<div className="productsPage">
			<div className="productsTextCard">
				<div className="productsTextCardText">
					<h1>Shop products</h1>
					<h3>Our most popular products based on sales. Updated frequently.</h3>
				</div>
				<div className="searchCatDiv">
					<SearchBar />
					<SortingSelector />
				</div>
			</div>
			<div className="productGrid">
				{products && products.length
					? products.map((product) => (
							<ul
								// className="productGrid"
								key={`All products: ${product.name}`}
							>
								<div className="productCard">
									<Link
										className="productCardLink"
										to={`/products/${product.id}`}
									>
										<img src={`${product.imageUrl}`} />
										<h1>{product.name}</h1>
										<p>${product.price}</p>
									</Link>
								</div>
								{isAdmin ? (
									<DeleteButton
										productId={product.id}
										productName={product.name}
									/>
								) : null}
							</ul>
					  ))
					: null}
			</div>
			<span ref={scrollElement}>SCROLL SPAN</span>
		</div>
	);
};
export default AllProducts;
