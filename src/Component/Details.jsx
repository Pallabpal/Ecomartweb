import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useValue } from '../Logincontext/Logincontext';
import StarRating from './Starrating';
const ProductDetails = () => {
    const {displayitem}= useValue();
    console.log(displayitem);

  return (
    <>
    {displayitem &&
        <div className="container">
        <div className="row">
          <div className="col-md-6">
            <img src={displayitem.thumbnail} alt={'img'} className="img-fluid" />
            <div className="mt-3 related" >
              {displayitem.images.map((image, index) => (
                <img key={index} src={image} alt={`img`} className="img-thumbnail mr-2" />
              ))}
            </div>
          </div>
          <div className="col-md-6 displaydesc">
            <h1>{displayitem.title}</h1>
            <p>Brand: {displayitem.brand}</p>
            <p>{displayitem.description}</p>
            <p>Price: ${displayitem.price}</p>
            <p>Stock: {displayitem.stock}</p>
            <StarRating  rating={displayitem.rating}/>
          </div>
        </div>
      </div>}
      </>
  );
};

export default ProductDetails;
