import React from 'react';
import {db} from '../Firebase/config'
import {   collection, onSnapshot } from "firebase/firestore";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { useValue } from '../Logincontext/Logincontext';
import {useNavigate} from 'react-router-dom';
const Signin = () => {
    const [formData, setformData]=useState({email:'', password: ''});
    const [data, setData]=useState();
    const navigate = useNavigate();
    const {getValue} = useValue();
    

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
    
      data.forEach((value) => {
       
        if (value.email === formData.email) {
          userExists = true;
          console.log(userExists);
          getValue(value);
          const myob={value};
          const jsonString = JSON.stringify(myob);
          localStorage.setItem('myob', jsonString);
        //   console.log(value.id);          
         
        }
      });
        if(userExists){
            
            setformData({email: '', password: '' });
            toast.success(`Login Successfull`, {
                position: toast.POSITION.TOP_RIGHT,
              });
            setTimeout(()=>navigate('/'), 2000)
       
        }
        else{
            toast.error(`Account not exist`, {
                position: toast.POSITION.TOP_RIGHT,
              });
             
        }
      };
      
      

    return (

<div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <div class="card">
                <div class="card-header">Sign In</div>
                <div class="card-body">
                    <form onSubmit={handleSubmit}>
                        <div class="mb-3">
                            <label for="email" class="form-label">Email address</label>
                            <input type="email" class="form-control" id="email" aria-describedby="emailHelp"
                            required value={formData.name} 
                            onChange={(e)=>setformData({ email:e.target.value, password:formData.password})}
                            />
                            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" class="form-control" id="password"
                            required value={formData.name} 
                            onChange={(e)=>setformData({ email:formData.email, password:e.target.value})}
                            />
                        </div>
                        <div class="form-check mb-3">
                            <input type="checkbox" class="form-check-input" id="remember" />
                            <label class="form-check-label" for="remember">Remember me</label>
                        </div>
                        <button type="submit" class="btn btn-primary">Sign In</button>
                    </form>
                </div>
                
            </div>
        </div>
    </div>
</div>
    );
};

export default Signin;