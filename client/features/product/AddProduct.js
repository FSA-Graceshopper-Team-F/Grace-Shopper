import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProductAsync, fetchProductsAsync } from "./productSlice";

const AddProduct = () => {
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(addProductAsync({ name, imageUrl, price, description }));
    setName("");
    setImageUrl("");
    setPrice("");
    setDescription("");
  };


  return (
    <div className="addAProduct">

      <section className="addAProductForm">
        <h1>Add a product</h1>
        <p>Please fill in this form to create a new product.</p>

        <form onSubmit={onSubmit}>

          <label>Product Name</label>
          <input
            type="text"
            placeholder="Product"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />



          <label>Product Price</label>
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />



          <label>Product Description</label>
          <textarea
            name="description"
            placeholder="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />



          <label>Image</label>
          <input
            type="url"
            placeholder="Image link"
            value={imageUrl}
            onChange={(event) => setImageUrl(event.target.value)}
          />


          <button>Submit</button>

        </form>
      </section>
    </div>
  )
};

export default AddProduct
