import { useState } from "react";
import Homepage from "./Home";
import styles from '../styles/Product.module.css'
// import Loader from "./Loader/Loader";
import { useValue } from "../Logincontext/Logincontext";
// import { onSnapshot, collection } from 'firebase/firestore';
// import { db } from "../Firebase/config";
export default function Product({data, store}) {
    // const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [price, setPrice]=useState('');
    const [category, setCategory]=useState('');
    // const [loading, setLoading]=useState(true);
    const {handledisplay} = useValue();
    // const [selected, setSelected]=useState(null);
    // const {userData}=useValue();
    // console.log(userData);
    const handleSelected=(item)=>{
       handledisplay(item);
    }

//     useEffect(()=>{

//     onSnapshot(collection(db, "products"), (snapShot) => {
//       const products= snapShot.docs.map((doc)=>{
//       return{
//           id:doc.id,
//           ...doc.data()
//       }
//     })
//     if(store.email){
//       products.forEach((value) => {
     
//         if (value.email === store.email) {
          
          
//           getValue(value);
          
//           return;
//         }
//       });
//     }
    
//   });

// },[store, getValue])


    // useEffect(() => {
    //     async function fetchData() {
    //         const response = await fetch('https://dummyjson.com/products?limit=100');
    //         // const response = await fetch('../Data/data.json');
    //         const d = await response.json();
    //         console.log(d);
    //         setData(d.products);
    //         setLoading(false);
    //     }
    //     fetchData();
    // }, []);
    // console.log(category)
    return (
       <div>
        <div className={styles.gallery}>
        <div className={styles.filter} style={{position:"sticky", top:"0"}}>
        <input type='text' placeholder="Enter Product Name" value={search} onChange={(e) => setSearch(e.target.value)} />
        <br/>
        <label htmlFor='vol'>{price}</label>
        <input type='range'id="vol" name="vol" min="10" max="6000" onChange={(e)=>setPrice(e.target.value)}/>
        <div className={styles.category}>
            <input type='radio' id='smartphones' value='smartphones' name='category'
             onChange={(e)=>setCategory(e.target.value)}
            />
            <label htmlFor='smartphones' name='category'>SmartPhone</label>

            <input type='radio' id='groceries' value='groceries' name='category' 
             onChange={(e)=>setCategory(e.target.value)}
            />
            <label htmlFor='groceries' name='category'>Groceries</label>

            <input type='radio' id='none' value='' name='category'
             onChange={(e)=>setCategory(e.target.value)}
            />
            <label htmlFor='none' name='category'>None</label>
        </div>
        </div>
        <div className={styles.mainContainer}>
            {data && data.filter((item) => {
                return search.toLocaleLowerCase()=== ''
                    ? item
                    : item.title.toLocaleLowerCase().includes(search.toLocaleLowerCase());
            }).filter((item)=>{
                return price===''
                ?item:
                item.price>=price
            }).filter((item)=>{
                return category===''
                ?item:
                item.category.toLocaleLowerCase().includes(category.toLocaleLowerCase())
            })
            .map((item, ind) => <Homepage key={ind} data={item} handleSelected={handleSelected} />)
            }
        </div>
    </div>
    </div>
    )
}
