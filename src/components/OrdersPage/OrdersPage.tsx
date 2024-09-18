import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { useEffect, useState } from "react";
import { IOrder } from "../../@types";
import api from "../../api/index";


function OrdersPage() {
const [orders, setOrders] = useState<IOrder[]>([])
const navigate = useNavigate()
const {user} = useUser()

if (!user) {
  return <Navigate to="/login" replace />
}
console.log(user);

useEffect(() => {
  const fetchOrders = async () => {
    try {
      console.log("avant fetch");
      
      const response = await api.get(`/orders/${user.id}`); // Requête à l'API pour récupérer les commandes de l'utilisateur
        console.log("Réponse API", response );
      setOrders(response.data); // Mise à jour de l'état avec les données reçues
    
    console.log(response.data);
    } catch (error) {
      console.error();
      ('Erreur lors de la récupération des commandes'); // Gère les erreurs
    }
  };

  if (user?.id) {
    fetchOrders();
  }
  
}, [user.id]); // Exécute le useEffect quand l'utilisateur change



return (
  <main className="max-w-7xl mx-auto p-10">
    <h1 className="text-center h2-title">Mes commandes</h1>
    {orders.length === 0 ? (
      <p>Aucune commande trouvée</p>
    ) : (
      <table className="table-auto w-full mt-10">
        <thead>
          <tr className="bg-beige text-left">
            <th className="py-4 px-6">Commande</th>
            <th className="py-4 px-6">Numéro</th>
            <th className="py-4 px-6">Date</th>
            <th className="py-4 px-6">Montant</th>
            <th className="py-4 px-6">Détails</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr
              key={order.id}
              className="border-b border-gray-300 bg-beige"
            >
              <td className="py-4 px-6">Commande</td>
              <td className="py-4 px-6">{order.id}</td>
              <td className="py-4 px-6">{new Date(order.createdAt).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}</td>
              <td className="py-4 px-6">{order.amount} €</td>
              <td className="py-4 px-6">
                <button className="btn text-white py-2 px-4 rounded" type="button" onClick={() => {
            navigate(`/orders-details/:id`);
          }}>
                  Consulter
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </main>
);
}

export default OrdersPage;
