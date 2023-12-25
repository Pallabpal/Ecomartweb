import React from 'react';
import { Link } from 'react-router-dom';
import {db} from '../Firebase/config'
import {  doc, setDoc, collection, onSnapshot } from "firebase/firestore";

import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { useValue } from '../Logincontext/Logincontext';
const Signup = () => {
  const [formData, setformData]=useState({name:'', email:'', password: ''});
  const [data, setData]=useState([]);
  const {getValue} = useValue();
  // console.log(userData);
  const navigate=useNavigate();
  // const [userExists, setUserExists]
  useEffect(()=>{

    onSnapshot(collection(db, "products"), (snapShot) => {
      const products= snapShot.docs.map((doc)=>{
      return{
          id:doc.id,
          ...doc.data()
      }
    })
    setData(products)
  });

},[])
const handleSubmit = async (e) => {
    e.preventDefault();
    
let userExists = false;
  if(data)
  data.forEach((value) => {
    if (value.email === formData.email) {
      userExists = true;
      getValue(value)
      return;
    }
  });
  else
  return;
  
    if (userExists) {
      toast.error(`Email Id already exist!`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setformData({ name: '', email: '', password: '' });
    } else {
      const docRef = doc(collection(db, "products"));
      toast.success(`Account Created Successfully!`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      await setDoc(docRef, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        cart: [],
        orders: [],
        createdOn: Date.now(),
      });
      
    
       setTimeout(()=>navigate('/Ecomart/signin'), 2000)
       
    }
  };
  
  
return (
<div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <div class="card">
                <div class="card-header">Sign Up</div>
                <div class="card-body">
                    <form onSubmit={handleSubmit}>
                        <div class="mb-3">
                            <label htmlFor="username" class="form-label">Username</label>
                            <input type="text" class="form-control" id="username" required value={formData.name} 
                            onChange={(e)=>setformData({name:e.target.value, email:formData.email, password:formData.password})}
                            />
                        </div>
                        <div class="mb-3">
                            <label htmlFor="email" class="form-label">Email address</label>
                            <input type="text" class="form-control"  required id="email"
                            value={formData.email} 
                            onChange={(e)=>setformData({name:formData.name, email:e.target.value, password:formData.password})}
                            />
                        </div>
                        <div class="mb-3">
                            <label htmlFor="password" class="form-label">Password</label>
                            <input type="password" required class="form-control" id="password" 
                            value={formData.password} 
                            onChange={(e)=>setformData({name:formData.name, email:formData.email, password:e.target.value})}/>
                        </div>
                        <div class="form-check mb-3">
                            <input type="checkbox" class="form-check-input" id="agree" />
                            <label class="form-check-label" htmlFor="agree">I agree to the terms and conditions</label>
                        </div>
                        <button type="submit" class="btn btn-primary">Sign Up</button>
                    </form>
                </div>
               
                <div class="card-footer">
                    <p>Already have an account? <Link to='/Ecomart/signin'>Sign In</Link></p>
                </div>
            </div>
        </div>
    </div>
</div>


    );
};

export default Signup;