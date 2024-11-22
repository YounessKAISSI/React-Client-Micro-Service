import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export function BillDetails() {
  const { billId } = useParams(); // Récupère l'ID de la facture depuis l'URL
  const [productItems, setProductItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProductItems() {
      try {
        // Appel API pour récupérer les détails des productItems
        const response = await fetch(`http://192.168.16.155:8083/api/bills/${billId}/productItems`);
        const result = await response.json();

        // Accéder à _embedded.productItems
        if (result._embedded && result._embedded.productItems) {
          setProductItems(result._embedded.productItems);
        } else {
          console.error("Aucun productItems trouvé dans les données.");
        }
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProductItems();
  }, [billId]);

  if (loading) return <div>Chargement...</div>;
  if (!productItems || productItems.length === 0) return <div>Aucun produit trouvé pour cette facture.</div>;

  return (
    <div>
      <h1>Détails des Produits pour la Facture {billId}</h1>
      <table className="table" border="1" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th>ID Produit</th>
            <th>Quantité</th>
            <th>Prix Unitaire (DH)</th>
            <th>Total (DH)</th>
          </tr>
        </thead>
        <tbody>
          {productItems.map((item, index) => (
            <tr key={index}>
              <td>{item.productId}</td>
              <td>{item.quantity}</td>
              <td>{item.unitPrice}</td>
              <td>{(item.quantity * item.unitPrice).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3" style={{ textAlign: 'right', fontWeight: 'bold' }}>
              Montant total :
            </td>
            <td style={{ fontWeight: 'bold' }}>
              {productItems
                .reduce((total, item) => total + item.quantity * item.unitPrice, 0)
                .toFixed(2)} DH
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default BillDetails;
