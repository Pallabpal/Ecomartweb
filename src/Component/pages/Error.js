
// react hook
import { useEffect } from "react";

// react router
import { useNavigate } from "react-router-dom"


// render error page
export function Error(){
    const navigate=useNavigate();

    // redirect to homepage after 3 second
    useEffect(()=>{
        setTimeout(()=>{
            navigate("/");
        },2000);
    },[])

    const handleError=(e)=>{
        e.preventDefault();
        navigate('/');
    }
    return(
        // Error message on screen
        <div style={{textAlign:"center"}}>
            <h1>Error, Something went wrong !!!</h1>
            <p>redirecting back to homepage... </p>
            <div><img src="https://cdn-icons-png.flaticon.com/128/6711/6711512.png" alt='Error_img'/></div>
            <button style={{cursor:'pointer', background:"yellow"}}onClick={handleError}>GO TO HOME</button>
        </div>

    )
}