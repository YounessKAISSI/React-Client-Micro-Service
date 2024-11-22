import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export function Products() {

    const [products,setProducts]=useState([]);

    useEffect(()=>{
      handleGetProducts()
    },[]);

    const handleGetProducts=()=>{
        fetch('http://localhost:8888/inventory-service/api/products')
            .then((response) => response.json())
            .then((data) => {
                console.log(data); // Vérifiez la réponse
                if (data._embedded && data._embedded.products) {
                    setProducts(data._embedded.products); // Récupérez les produits
                } else {
                    setProducts([]); // Aucun produit
                }
                
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
                
            });
    }

    const handleDeleteProduct = (product)=>{
      const newProducts = products.filter(p=>p.id!==product.id)
      setProducts(newProducts);
    }

    const handleCheckProduct = (product)=>{
      const newProducts = products.map(p=>{
        if(p.id===product.id){
          p.checked=!p.checked;
        }
        return p;
      })
      setProducts(newProducts);
    }

  return (
    <div className='p-1 m-1'>

      <div className='row'>
        <div className='col'>
        
          <div className='card'>
            <div className='card-body'>
             <h3>List of Products</h3>
             <table className='table'>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Checked</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {
                products.map(product=>(
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.quantity}</td>
                    <td>
                      <button onClick={()=>handleCheckProduct(product)} className="btn btn-outline-success">
                        <FontAwesomeIcon 
                        icon={product.checked ? faCheckCircle : faCircle}
                        ></FontAwesomeIcon>
                      </button>
                    </td>
                    <td>
                      <button onClick={()=>handleDeleteProduct(product)} className="btn btn-outline-danger">
                        <FontAwesomeIcon 
                          icon={faTrash}
                          ></FontAwesomeIcon>
                      </button>
                    </td>
                  </tr>
                ))
                }
              </tbody>
             </table>
            </div>
          </div>
        </div>
           
      </div>
    </div>
);
}

export default Products;