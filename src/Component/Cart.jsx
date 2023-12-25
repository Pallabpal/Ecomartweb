import React from 'react';
import { useValue } from '../Logincontext/Logincontext';
function CartPage() {
 
  const {userData, handleOrder, cart, removeitem}=useValue();
  
  const handleremoveItem = (itemId) => {
   
   let ind= cart.findIndex((value)=>value.id===itemId)
  
   cart.splice(ind, 1);
   removeitem(cart);
  };
  
  return (
    <div className="container cart-container">
      <h1>Your Cart</h1>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userData && cart.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>${item.price}</td>
              <td>{item.qty}</td>
              <td>${item.price * item.qty}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleremoveItem(item.id)}
                >
                  Remove
                </button>
                <button
                  className="btn btn-danger" 
                  onClick={() => handleOrder(item)}
                  style={{margin:'10px' }}
                >
                  Order
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CartPage;
