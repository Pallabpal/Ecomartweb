import './App.css'
import Navbar from "./Component/Navbar";
import Product from './Component/product';
import Signin from './Component/Signin';
import Signup  from './Component/Signup';
// import { useValue } from './Logincontext/Logincontext';
import CustomItemContext from './Logincontext/Logincontext';
import { ToastContainer } from 'react-toastify';
import Profile from './Component/Profile';
// import Profile from './Component/Profile';
// import { useState } from 'react';
import AlreadyLogin from './Component/alreadyLogin.js';
import CartPage from './Component/Cart.jsx';
import OrderPage from './Component/Order';
import ProductDetails from './Component/Details';
import { useEffect, useState } from 'react';
import Loader from './Component/Loader/Loader';
// import Homepage from './Component/Home';
import useLocalstorage from './Customhook/useLocalstorage';
// import {db} from '../Firebase/config'
// import {   collection, onSnapshot } from "firebase/firestore";
// import { onSnapshot, collection } from 'firebase/firestore';
// import { db } from './Firebase/config';
import { createBrowserRouter , RouterProvider} from "react-router-dom";
// import useLocalstorage from './Customhook/useLocalstorage';
function App(){
    //  const {userData}=useValue(); 
    //  console.log(useValue);
    const [data, setData] = useState([]);
    const [loading, setLoading]=useState(true);
    const [login, setLogin]=useState(null);
    const {store,setStore}=useLocalstorage();
    useEffect(() => {
      async function fetchData() {
        const response = await fetch('https://dummyjson.com/products?limit=100');
        const d = await response.json();
        setData(d.products);
        const jsonString = localStorage.getItem('myob');
        const myob = JSON.parse(jsonString);
        setLogin(myob);
        setLoading(false);
      }
      fetchData();
    }, []);    
  
  const handleStore=()=>{
    setStore({email:'', password: ''});
  }
    const router = createBrowserRouter(
        [
            {
               path:'/',
               element:
               
               <CustomItemContext>
                <Navbar />
               </CustomItemContext>
               ,

               children:[
                  {
                    path:'/Ecomart/signin', element:<Signin  />
                  },
                  {
                      path:'/Ecomart/signup', element:<Signup/>
                  },
                  {
                    path:'/Ecomart/myprofile', element:<Profile/>
                 },
                {
                    path:'/', element:loading?<Loader />:
                    <Product data={data} store={store} handleStore={handleStore} />
                },
               {
                 path:'/details', element:<ProductDetails/>
               },
                        
                {
                  path:'/Ecomart/cart', element:<CartPage />,
                 
                },
                {
                    path:'/Ecomart/myorders', element:<OrderPage />,
                },
                {
                  path: '/', element: login !== null ? <AlreadyLogin /> : null
                }
                              
                
               ]
            },
        ],
        {
          basename: '/Ecomartweb'
        }
    )
    return (
       <>
        <RouterProvider router={router} />
        <ToastContainer />
        </>
       
      
    )
}

export default App;