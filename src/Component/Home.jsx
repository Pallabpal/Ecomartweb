import styles from '../styles/Product.module.css'
import 'react-toastify/dist/ReactToastify.css';
import { useValue } from '../Logincontext/Logincontext'
import StarRating from './Starrating';
import { Link } from 'react-router-dom';
import { productContext } from '../Logincontext/Productcontext';
export default function Homepage(props){ 
    const { handleCart}=useValue();
    const {data, handleSelected} =props
    
    return(
            <productContext.Provider value={{data}}>
            <div className={styles.item} >
            <div  className={styles.contentImg}>
           <Link to ='/details'><img  src={data.thumbnail} alt={'thumbnail'} onClick={()=>handleSelected(data)} /></Link>
            </div>
            <div className={styles.itemdesc}>
                <p>${data.price}&nbsp; &nbsp; &nbsp;<span style={{color:'green'}}>Flat: <b>{data.discountPercentage}%</b> off</span>
                <StarRating rating={data.rating} />
                </p>
               
                <p style={{fontWeight:"bold"}}>{data.title}</p>
                <p>{data.description}</p>
            </div>
            <div >
                <button className={styles.btn} onClick={()=>handleCart(data)}>Add To Cart</button>
                
            </div>
        </div>
        </productContext.Provider>
      
    )
}