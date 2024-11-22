//import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import {Home} from './components/Home';
import {Customers} from './components/Customers';
import {Products} from './components/Products';
import {Bills} from './components/Bills';
import {NewCustomer} from './components/NewCustomer';
import {NewProduct} from './components/NewProduct';
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from 'react';
import BillDetails from './components/BillDetails';

function App() {
  const [currentRoute,setCurrentRoute] = useState("");
  
  useEffect(()=>{
    const path = window.location.pathname.toLocaleLowerCase();
    setCurrentRoute(path.slice(1, path.length));
  },[]);

  return (
    <BrowserRouter>
      //{currentRoute}
          <nav className='m-1 p-1 border border-info'>
            <ul className="nav na-pills">
              <li>
                <Link 
                onClick={()=>setCurrentRoute("home")}
                className={
                  currentRoute==="home"
                  ?"btn btn-info ms-1"
                  :"btn btn-outline-info ms-1"
                  } 
                  to={"/home"}>
                  Home
                </Link>
              </li>
              <li>
                <Link 
                onClick={()=>setCurrentRoute("customers")}
                className={
                  currentRoute==="customers"
                  ?"btn btn-info ms-1"
                  :"btn btn-outline-info ms-1" 
                  } 
                  to={"/customers"}>
                  Customers
                </Link>
              </li>
              <li>
                <Link 
                onClick={()=>setCurrentRoute("products")}
                className={
                  currentRoute==="products"
                  ?"btn btn-info ms-1"
                  :"btn btn-outline-info ms-1" 
                  } 
                  to={"/products"}>
                  Products
                </Link>
              </li>
              <li>
                <Link 
                onClick={()=>setCurrentRoute("bills")}
                className={
                  currentRoute==="bills"
                  ?"btn btn-info ms-1"
                  :"btn btn-outline-info ms-1" 
                  } 
                  to={"/bills"}>
                  Bills
                </Link>
              </li>
              <li>
                <Link 
                onClick={()=>setCurrentRoute("newcustomer")}
                className={
                  currentRoute==="newCustomer"
                  ?"btn btn-info ms-1"
                  :"btn btn-outline-info ms-1" 
                  } 
                  to={"/newcustomer"}>
                  New Customer
                </Link>
              </li>
              <li>
                <Link 
                onClick={()=>setCurrentRoute("newproduct")}
                className={
                  currentRoute==="newproduct"
                  ?"btn btn-info ms-1"
                  :"btn btn-outline-info ms-1" 
                  } 
                  to={"/newproduct"}>
                  New Product
                </Link>
              </li>
            </ul>
        </nav>
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/products" element={<Products />} />
            <Route path="/bills" element={<Bills />} />
            <Route path="/newcustomer" element={<NewCustomer />} />
            <Route path="/newproduct" element={<NewProduct />} />
            <Route path="/billdetails/:billId" element={<BillDetails />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
