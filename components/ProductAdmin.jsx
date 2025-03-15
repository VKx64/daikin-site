import React from 'react'

const ProductAdmin = ({ category, description, id, image, name, price }) => {
  const imageUrl = `${process.env.NEXT_PUBLIC_POCKETBASE_URL}/api/files/products/${id}/${image}`;
  return (
    <div className="card bg-base-100 w-64 shadow-sm">
      <figure className="h-48 w-full overflow-hidden">
        <img src={imageUrl} alt={name} className="object-cover h-full w-full" />
      </figure>
      <div className="card-body gap-1 p-5">
        <h2 className="card-title">{name}</h2>
        <p>Price: ₱{price}</p>
        <div className="card-actions w-full mt-2 flex flex-col">
          <button className="btn btn-sm btn-primary w-full">Edit Product</button>
          <button className="btn btn-sm btn-error w-full">Delete</button>
        </div>
      </div>
    </div>
  );
}

export default ProductAdmin;