import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { fetchProductsAsync, selectProducts } from "./productSlice";
import { Link } from "react-router-dom";
import { selectAuth } from "../auth/authSlice";
import DeleteButton from "./DeleteButton";
import { SortingSelector } from "./SortingSelector";
import { SearchBar } from "./SearchBar";
import { InfiniteScroll } from "./InfiniteScroll";

const AllProducts = () => {
	const dispatch = useDispatch();
	const products = useSelector(selectProducts);
	const { isAdmin } = useSelector(selectAuth);
	const [currentProducts, setCurrentProducts] = useState(products);
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
  const [scroll, setScroll] = useState(false)
	// useEffect(() => {
		
  //   console.log(currentProducts, "effect")
  //   console.log(currentPage, 'effect page')
	// }, [dispatch, scroll]);

	const handleScroll = () => {
    console.log(currentPage,"scroll page")
    setScroll(true)
		setCurrentPage(currentPage + 1);
		setCurrentProducts([...currentProducts, ...products]);
    dispatch(fetchProductsAsync({ currentPage, pageSize }));
	};

	return (
		<div>
			<div className="productsTextCard">
				<h1 className="productsTitle">Shop products</h1>
				<h3 className="productsText">
					Our most popular products based on sales. Updated frequently.
				</h3>
			</div>
			<SearchBar />
			<SortingSelector />
			<div className="productGrid">
				{currentProducts && currentProducts.length
					? currentProducts.map((product) => (
							<ul className="productGrid" key={`All products: ${product.name}`}>
								<div className="productCard">
									<Link
										className="productCardLink"
										to={`/products/${product.id}`}
									>
										<img src={`${product.imageUrl}`} />
										<li>{[product.name, product.price, product.imageUrl]}</li>
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
					: console.log("---NO PRODUCTS---", null)}
			</div>
			<InfiniteScroll onIntersection={handleScroll}/>
		</div>
	);
};
export default AllProducts;
