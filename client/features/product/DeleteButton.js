import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteProductAsync, fetchProductsAsync } from "./productSlice";

const DeleteButton = ({productId, productName}) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteProductAsync(productId));
    alert(`${productName} was deleted`);
    dispatch(fetchProductsAsync());
  };

  return (
    <div>
      <button
      className="btn"
      onClick={handleDelete}>Delete Product
      </button>
    </div>
  )
};

export default DeleteButton;
