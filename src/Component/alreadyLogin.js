
import { useValue } from '../Logincontext/Logincontext';
import {useNavigate} from 'react-router-dom';
import {useEffect, useState } from 'react';
import {db} from '../Firebase/config'
import {  doc, getDoc } from "firebase/firestore";
// import {   collection, onSnapshot } from "firebase/firestore";
export default function AlreadyLogin(){
    const navigate = useNavigate();
    const [data, setData]=useState();
    const {getValue} = useValue();
    // const [data, setData]=useState();
    useEffect(()=>{
      const jsonString = localStorage.getItem('myob');
      const myob = JSON.parse(jsonString);
      console.log('jjjj')
      if(myob){
       
        // setlogin(myob.value);
          const  alreadyLogin=async ()=>{
          const id =myob.value.id;
          const docRef = doc(db, "products", id); 
          const docSnap = await getDoc(docRef);
          const existingData = docSnap.data();
          setData(existingData);
          getValue(data);
        }
        alreadyLogin();
        navigate('/');
       
      } 
    }, [])
    return(
        <>
          
        </>
    )
}