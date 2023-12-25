import React from 'react';
import { useValue } from '../Logincontext/Logincontext';
const Profile = () => {
    const {userData, order}= useValue();
    console.log(order);

    return (
        
    <div>
    <div class="container mt-5">
    <div class="row">
        <div class="col-md-4">
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">User Profile</h4>
                    <p class="card-text">Welcome, <b>{userData?userData.name:null}</b></p>
                </div>
            </div>
        </div>

        <div class="col-md-8">
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">Order History</h4>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                        {userData && order.map((item, ind)=>
                        <tr key={ind}>
                                <td>{item.id}</td>
                                <td>{item.title}</td>
                                <td>${item.price}</td>
                                <td>{item.ordqty}</td>
                                <td>{new Date(item.created).toLocaleDateString()}</td>
                        </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
            </div>
       
    );
};

export default Profile;