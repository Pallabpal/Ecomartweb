import { useState, useEffect } from "react";

const useLocalstorage=()=>{
    const [store, setStore]=useState({email:'', password: ''});
    useEffect(()=>{
        // Retrieve the JSON string from localStorage
        
        if(localStorage.getItem("myObject")!=null){
            const jsonString = localStorage.getItem('myObject');
            const myObject = JSON.parse(jsonString);
            setStore({email:myObject.email, password:myObject.password});
        }
        
    },[])
    
    return ({store, setStore});
}
export default useLocalstorage;