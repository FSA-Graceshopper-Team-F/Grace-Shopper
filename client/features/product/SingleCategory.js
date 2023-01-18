import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from 'react';
import { fetchProductsAsync, selectProducts } from "./productSlice";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const SingleCategory = () => {
    const products = useSelector(selectProducts);
    const dispatch = useDispatch();
    const { singleCategory } = useParams();

    useEffect(() => {
        dispatch(fetchProductsAsync());
    }, [dispatch]);

    return (
        <div>
            {products && products.length &&
                products.filter(product => product.category.toLowerCase() === singleCategory).map(product => (
                    <ul
                        className="allProducts"
                        key={`Filtered products: ${product.id}`}>
                        <Link to={`/products/${product.id}`}>
                            <img src={`${product.imageUrl}`} />
                            <li>
                                {[product.name, product.price, product.imageUrl]}  </li>
                            <div>
                                Category: {product.category}
                            </div>
                        </Link>
                    </ul>
                ))
            }
        </div>
    )
};
export default SingleCategory;








