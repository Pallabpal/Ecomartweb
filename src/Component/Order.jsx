import React, { useEffect, useState } from 'react';
import { useValue } from '../Logincontext/Logincontext';
function OrderPage() {
 
  const {userData, order, removeorderitemarray}=useValue();
  const [totalprice, setTotalprice]=useState(0);
  
  useEffect(()=>{
        let cal=0;
        
        order.forEach((element) => {
          cal+=(element.price*element.ordqty);

        });
        setTotalprice(cal);
       
  },[order]);
  const removeorderItem=(index, item)=>{
    
    const updatedOrder = order.filter((_, i) => i !== index);
     removeorderitemarray(updatedOrder, item);
  }
  return (
    <div className="container cart-container">
      <h1>Your Shopping Orders</h1>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userData && order.map((item,ind) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>${item.price}</td>
              <td>{item.ordqty}</td>
              <td>${(item.price * item.qty).toFixed(2)}</td>
              <td>
                <button onClick={()=>removeorderItem(ind, item)} className="btn btn-danger">
                   Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-end">
        <h4>Total: ${totalprice}</h4>
        <button className="btn btn-primary">Proceed to Checkout</button>
      </div>
    </div>
  );
}


export default OrderPage;
