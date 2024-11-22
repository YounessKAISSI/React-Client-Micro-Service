import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

export function Bills() {

  const [bills,setBills]=useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    handleGetBills()
  },[]);

  const handleGetBills=()=>{
      fetch('http://localhost:8888/billing-service/api/bills')
          .then((response) => response.json())
          .then((data) => {
              console.log(data); // Vérifiez la réponse
              if (data._embedded && data._embedded.bills) {
                  setBills(data._embedded.bills); // Récupérez les clients
              } else {
                  setBills([]); // Aucun client
              }
              
          })
          .catch((error) => {
              console.error('Error fetching bills:', error);
              
          });
  }

  const handleDeleteProduct = (customer)=>{
    const newBills = bills.filter(c=>c.id!==customer.id)
    setBills(newBills);
  }

  const handleCheckProduct = (bill)=>{
    const newBill = bills.map(b=>{
      if(b.id===bill.id){
        b.checked=!b.checked;
      }
      return b;
    })
    setBills(newBill);
  }

return (
  <div className='p-1 m-1'>

    <div className='row'>
      <div className='col'>
      
        <div className='card'>
          <div className='card-body'>
           <h3>List of Bills</h3>
           <table className='table'>
            <thead>
              <tr>
                <th>Bill Id</th>
                <th>Date</th>
                <th>Customer Id</th>
                <th>Product items</th>
                <th>Checked</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {
              bills.map(bill=>(
                <tr key={bill.id}>
                  <td>{bill.id}</td>
                  <td>{bill.billingDate}</td>
                  <td>{bill.customerId}</td>
                  <td>
                    <button onClick={() => navigate(`/BillDetails/${bill.id}`)} className="btn btn-outline-success">
                      Details
                    </button>
                  </td>
                  <td>
                    <button onClick={()=>handleCheckProduct(bill)} className="btn btn-outline-success">
                      <FontAwesomeIcon 
                      icon={bill.checked ? faCheckCircle : faCircle}
                      ></FontAwesomeIcon>
                    </button>
                  </td>
                  <td>
                    <button onClick={()=>handleDeleteProduct(bill)} className="btn btn-outline-danger">
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
export default Bills;