import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export  function Customers() {
  
  const [customers,setcustomers]=useState([]);

  useEffect(()=>{
    handleGetcustomers()
  },[]);

  const handleGetcustomers=()=>{
      fetch('http://localhost:8888/customer-service/api/customers')
          .then((response) => response.json())
          .then((data) => {
              console.log(data); // Vérifiez la réponse
              if (data._embedded && data._embedded.customers) {
                  setcustomers(data._embedded.customers); // Récupérez les clients
              } else {
                  setcustomers([]); // Aucun client
              }
              
          })
          .catch((error) => {
              console.error('Error fetching customers:', error);
              
          });
  }

  const handleDeleteProduct = (customer)=>{
    const newcustomers = customers.filter(c=>c.id!==customer.id)
    setcustomers(newcustomers);
  }

  const handleCheckProduct = (customer)=>{
    const newcustomers = customers.map(c=>{
      if(c.id===customer.id){
        c.checked=!c.checked;
      }
      return c;
    })
    setcustomers(newcustomers);
  }

return (
  <div className='p-1 m-1'>

    <div className='row'>
      <div className='col'>
      
        <div className='card'>
          <div className='card-body'>
           <h3>List of customers</h3>
           <table className='table'>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Checked</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {
              customers.map(customer=>(
                <tr key={customer.id}>
                  <td>{customer.id}</td>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>
                    <button onClick={()=>handleCheckProduct(customer)} className="btn btn-outline-success">
                      <FontAwesomeIcon 
                      icon={customer.checked ? faCheckCircle : faCircle}
                      ></FontAwesomeIcon>
                    </button>
                  </td>
                  <td>
                    <button onClick={()=>handleDeleteProduct(customer)} className="btn btn-outline-danger">
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
export default Customers;