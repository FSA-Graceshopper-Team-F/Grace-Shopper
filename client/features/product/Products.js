import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const AllProducts = () => {
  const products = useSelector();
  const dispatch = useDispatch();

  useEffect(() => {

  });

  return (
    <div>
      {products && products.length ?
       products.map((product) => (
        <ul
        className="allProducts"
        key={`All products: ${product.id}`}>
          <li>
            {[product.name, product.price, product.imageUrl]}
          </li>
        </ul>
       )): console.log('---NO PRODUCTS---', null)
    }
    </div>
  )
};

export default AllProducts;
