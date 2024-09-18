import { useEffect, useState } from "react";
import { IOrder, IOrderLine } from "../../@types";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import api from "../../api";
import { useProject } from "../../context/ProjectContext";


function OrderDetailPage() {

  const { orderId } = useParams<{ orderId: string }>()
  const [ orderLine, setOrderLine ] = useState<IOrderLine[]>([])
  const [orderDetails, setOrderDetails] = useState<IOrder | null>(null);
  const { project } = useProject()
    const { user } = useUser()
    if (!user) {
      return <Navigate to= "/login" replace/> 
    }

    useEffect(() => {
      // Récupération des lignes de commande
      const fetchOrderLines = async ()=> {
        try {
          const orderLinesResponse = await api.get(`/order_line/${orderId}`)
          setOrderLine(orderLinesResponse.data)

          // Récupération des détails de la commande 
          const orderResponse = await api.get(`/orders/${orderId}`); 
          setOrderDetails(orderResponse.data);

        } catch (error) {
          console.error(
            "Erreur lors de la récupération des détails de la commande"
          );
        }
      }
      fetchOrderLines()
    }, [orderId])

  
  return (
    <div className="m-10">
      <h1 className="text-center text-xl font-bold mb-4">
        Commande numéro {orderId}
      </h1>
      <p className="text-center mb-8">Date de la commande : {orderDetails?.date}</p>
      
      <div className="space-y-8">
        {orderLine.map((order) => (
          <div key={order.id} className="bg-gray-200 p-4 rounded-md shadow-md">
            <p className="mb-2">
              <strong>Nom du projet :</strong> {project?.name}
            </p>
            <p className="mb-2">
              <strong>Nom de l'arbre :</strong> {order.project_tree_id}
            </p>
            <p className="mb-2">
              <strong>Montant Unitaire :</strong> {order.amount} €
            </p>
            <div className="flex justify-between">
              <p><strong>Quantité :</strong> {order.quantity}</p>
              <p><strong>Montant Total :</strong> {order.amount} €</p>
            </div>
          </div>
        ))}
      </div>
      
      <p className="text-right font-bold mt-8">
        Montant Total de la commande : { orderDetails?.amount || 'Montant indisponible'} €
      </p>
    </div>
  );
}

export default OrderDetailPage;
