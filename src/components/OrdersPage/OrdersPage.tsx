import { Navigate, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { useEffect, useState } from "react";
import { IOrder } from "../../@types";
import api from "../../api";


function OrdersPage() {
const [orders, setOrders] = useState<IOrder[]>([])
const navigate = useNavigate()
const {user} = useUser()
if (!user) {
  return <Navigate to="/login" replace />
}

useEffect(() => {
  const fetchOrders = async () => {
    try {
      const response = await api.get(`/orders/${user?.id}`); // Requête à l'API pour récupérer les commandes de l'utilisateur
      setOrders(response.data); // Mise à jour de l'état avec les données reçues
    
    } catch (error) {
      console.error();
      ('Erreur lors de la récupération des commandes'); // Gère les erreurs
     
    }
  };

  if (user?.id) {
    fetchOrders(); // Récupère les commandes seulement si l'utilisateur est connecté
  }
}, [user?.id]); // Exécute le useEffect quand l'utilisateur change


  return (
    <main className="max-w-7xl mx-auto p-10">
      <h1 className="text-center h2-title">Mes commandes</h1>
      {orders.length === 0 ? (
        <p>Aucune commande trouvée</p>
      ): (    
      <ul>
        {orders.map((order) => ( 
        <li className="flex justify-between items-center mt-20 py-6 px-10 bg-beige">
          <p>Commande</p>
          <p>{order.amount}</p>
          <time>{order.date}</time>
          <data>{order.amount}</data>
          <button className="btn" type="button">
            Consulter
          </button>
        </li>
      ))}
      </ul> 
    )}
    </main>
  );
}

export default OrdersPage;
