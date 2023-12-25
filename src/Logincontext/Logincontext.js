import { createContext, useState, useContext} from "react";
// import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import {db} from '../Firebase/config'
import {  doc,  updateDoc, getDoc } from "firebase/firestore";
import 'react-toastify/dist/ReactToastify.css';
const itemContext=createContext();

function useValue(){
    const userData =useContext(itemContext);

    return userData;
}

function CustomItemContext({children, handleStore}){
  const navigate = useNavigate();
    const [userData, setUserData] =useState(null);
    const [cart, setcart]=useState([]);
    const [order, setOrder]=useState([]);
    
    const [displayitem, setDisplayitem]=useState(null);
    
    // useEffect(()=>{
    //   const jsonString = localStorage.getItem('myob');
    //   const myob = JSON.parse(jsonString);
    //   if(myob){
    //     // setlogin(myob.value);
    //       const  alreadyLogin=async ()=>{
    //       const id =myob.value.id;
    //       const docRef = doc(db, "products", id); 
    //       const docSnap = await getDoc(docRef);
    //       const existingData = docSnap.data();
    //       getValue(existingData);
    //     }
    //     alreadyLogin();
        
       
    //   } 
    // },[])
    function getValue(data){     
        setUserData(data);
        setcart(data.cart);
        setOrder(data.orders);
        // console.log('main', data);
    }
    const handledisplay=(item)=>{
      setDisplayitem(item);
    }

    
    const updateCart = async (product) => {
        const userId = userData.id; 
        const docRef = doc(db, "products", userId); 
        const docSnap = await getDoc(docRef);
        const existingData = docSnap.data();

        const ind = existingData.cart.findIndex((item)=>item.id===product.id);
        // console.log(existingData)
        if(ind>=0){
            existingData.cart[ind].qty+=1;
            const newCart = [...existingData.cart];
            setcart(newCart);
            toast.success('Item added',{
                position: toast.POSITION.TOP_RIGHT,
              });
            setUserData({ ...userData, cart: newCart });
           
             
            await updateDoc(docRef, {
                cart: newCart,
            });
           
        }else{
            const newCart = [...existingData.cart, {...product, qty:1,ordqty:1}];
            setcart(newCart);
            setUserData({ ...userData, cart: newCart });
            await updateDoc(docRef, {
              cart: newCart,
            });
            toast.success('Item added',{
                position: toast.POSITION.TOP_RIGHT,
              });
            console.log("Cart updated successfully!");
        }

          
          

        
      };
    const handleCart=(product)=>{
        if(userData){
              
           updateCart(product);

        }else{
            toast.warning('Login', {
                position: toast.POSITION.TOP_RIGHT,
              });
              return;
        }
    }
    const removeCart=async(newCart)=>{
        const userId = userData.id; 
        const docRef = doc(db, "products", userId); 
        // const docSnap = await getDoc(docRef);
        // const existingData = docSnap.data();
        // const ind = existingData.cart.findIndex((item)=>item.id===product.id);
        setcart(newCart);
        setUserData({ ...userData, cart: newCart });
        await updateDoc(docRef, {
          cart: newCart,
      });
      

    }
    const removeitem=(newCart)=>{
      removeCart(newCart);
        
    }
    const removeOrder=async(neworder,item)=>{
      const userId = userData.id; 
      const docRef = doc(db, "products", userId); 
      const newCart =neworder;
      setOrder(newCart);  
      setUserData({ ...userData, orders: newCart });
      
      await updateDoc(docRef, {
        orders: newCart,
    });
    

  }
    const removeorderitemarray=(neworder,item)=>{
      removeOrder(neworder,item);
        
    }
    const handleOrder = async (product) => {
        const userId = userData.id; 
        const docRef = doc(db, "products", userId); 
        
        // Check if the document exists
        const docSnap = await getDoc(docRef);
      
      
          // If the document exists, update the cart field
          const existingData = docSnap.data();
          const ind = existingData.orders.findIndex((item)=>item.id===product.id);
          
          if(ind>=0){
            existingData.orders[ind].ordqty+=1;
            const newCart = [...existingData.orders];
            toast.success('Item added exists',{
              position: toast.POSITION.TOP_RIGHT,
            });
            // setTotal((prev)=>prev+(product.price*product.ordqty));
            setOrder(newCart);
            setUserData({ ...userData, orders: newCart });
            await updateDoc(docRef, {
            orders: newCart,
            });
            return;
          }else{
            const newCart = [...existingData.orders, {...product, created:Date.now()}];
            toast.success('Item added',{
              position: toast.POSITION.TOP_RIGHT,
            });
            // setTotal((prev)=>prev+(product.price*product.ordqty));
            setOrder(newCart);
            setUserData({ ...userData, orders: newCart });
            await updateDoc(docRef, {
            orders: newCart,
            });
          }
          
          
          
        //  console.log(order)
          console.log("Orders updated successfully!");
        
      };
    const handleLogout=()=>{
        setOrder()
        setUserData(null);
        // const jsonString = localStorage.getItem('myob');
        // const myob = JSON.parse(jsonString);
        // console.log(myob.value.email);
        localStorage.clear();
        navigate('/');
    }
     
    return(
        <itemContext.Provider value ={{userData, getValue, handleCart, cart, handleLogout,
           handleOrder, order, handledisplay,
           displayitem, removeitem, removeorderitemarray}}>
           {children}
        </itemContext.Provider>
    )

}

export {itemContext, useValue};
export default CustomItemContext;