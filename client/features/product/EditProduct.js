import React, { useEffect, useState } from "react";
import axios from "axios";

const EditProduct = ({ afterEdit, currentProduct }) => {
	const [product, setProduct] = useState({ ...currentProduct });
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setProduct({ ...currentProduct });
	}, [currentProduct]);

	const onSubmit = (event) => {
		event.preventDefault();
		setLoading(true);
		const token = window.localStorage.getItem("token");
		const config = {
			headers: {
				Authorization: token,
			},
		};

		axios
			.put(`/api/products/${product.id}`, product, config)
			.then(afterEdit)
			.catch(console.error)
			.finally(() => setLoading(false));
	};
	const updateProductValues = (event) => {
		const keyToUpdate = event.target.name;
		setProduct((currentValues) => ({
			...currentValues,
			[keyToUpdate]: event.target.value,
		}));
		console.log(product)
	};

	return (
		<div className="editProduct">
			<section className="editProductHeader">
				<h2>Edit Product</h2>
				<p>Fill out the form below</p>
			</section>

			<div className="editProductForm">
				<form onSubmit={onSubmit}>
					
						<label>Product Name</label>
						<input
							disabled={loading}
							name="name"
							onChange={updateProductValues}
							placeholder="name"
							type="text"
							value={product.name}
						/>
					

					
						<label>Product Price</label>
						<input
							disabled={loading}
							name="price"
							onChange={updateProductValues}
							placeholder="Price"
							type="number"
							value={product.price}
						/>
					

				
						<label>Product Description</label>
						<textarea
							disabled={loading}
							name="description"
							onChange={updateProductValues}
							placeholder="description"
							type="description"
							value={product.description}
						/>
				

				
						<label>Image</label>
						<input
							disabled={loading}
							name="imageUrl"
							onChange={updateProductValues}
							placeholder="Image link"
							type="text"
							value={product.imageUrl}
						/>
					
					<div>
						<button className="btn" disabled={loading}>Submit</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default EditProduct;
