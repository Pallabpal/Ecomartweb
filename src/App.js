// Importing CSS file
// import './App.css';

// Importing React and other components
import React, { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

// Importing custom components and hooks
import Navbar from './Component/Navbar';
import Product from './Component/product';
import Signin from './Component/Signin';
import Signup from './Component/Signup';
import CustomItemContext from './Logincontext/Logincontext';
import Profile from './Component/Profile';
// import AlreadyLogin from './Component/alreadyLogin.js';
import CartPage from './Component/Cart.jsx';
import OrderPage from './Component/Order';
import ProductDetails from './Component/Details';
import Loader from './Component/Loader/Loader';
import AboutPage from './Component/pages/About.js';
import ContactPage from './Component/pages/Contact.js';
import useLocalstorage from './Customhook/useLocalstorage';
import { Error } from './Component/pages/Error.js';

// Main App component
function App() {
  // State variables using hooks
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [login, setLogin] = useState(null);
  const { store, setStore } = useLocalstorage();

  // Fetching data on component mount
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://dummyjson.com/products?limit=100');
      const d = await response.json();
      setData(d.products);
      // const jsonString = localStorage.getItem('myob');
      // const myob = JSON.parse(jsonString);
      // setLogin(myob);
      setLoading(false);
    }
    fetchData();
  }, []);

  // Function to handle store
  const handleStore = () => {
    setStore({ email: '', password: '' });
  }

  // Creating the router configuration
  const router = createBrowserRouter([
    {
      path: '/',
      element:
        <CustomItemContext>
          <Navbar />
        </CustomItemContext>,
      errorElement: <Error />,
      children: [
        { path: '/Ecomart/signin', element: <Signin /> },
        { path: '/Ecomart/signup', element: <Signup /> },
        { path: '/Ecomart/myprofile', element: <Profile /> },
        { path: '/', element: loading ? <Loader /> : <Product data={data} store={store} handleStore={handleStore} /> },
        { path: '/details', element: <ProductDetails /> },
        { path: '/Ecomart/cart', element: <CartPage /> },
        { path: '/Ecomart/myorders', element: <OrderPage /> },
        { path: '/Ecomart/about', element: <AboutPage /> },
        { path: '/Ecomart/contact', element: <ContactPage /> },
        // { path: '/', element: login !== null ? <AlreadyLogin /> : null }
      ]
    },
  ],
  {
    basename: '/Ecomartweb'
  });

  // Rendering the main component
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

// Exporting the App component
export default App;
