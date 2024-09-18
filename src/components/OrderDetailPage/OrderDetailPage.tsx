import { useEffect, useState } from "react";
import { IOrder, IOrderLine } from "../../@types";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import api from "../../api";
import { useProject } from "../../context/ProjectContext";


function OrderDetailPage() {

  const { orderId } = useParams<{ orderId: number}>()
  const [ orderLines, setOrderLines ] = useState<IOrderLine[]>([])
  const [orderDetails, setOrderDetails] = useState<IOrder | null>(null);
  const { project } = useProject()
    const { user } = useUser()
    if (!user) {
      return <Navigate to= "/login" replace/> 
    }

    useEffect(() => {
      console.log(user);

      // Récupération des lignes de commande
      const fetchOrderLines = async ()=> {
        try {
          const orderLinesResponse = await api.get(`/order_line/${orderId}`)
          setOrderLines(orderLinesResponse.data)
          console.log(orderLinesResponse);
          

          // Récupération des détails de la commande 
          const orderResponse = await api.get(`/orders/${orderId}`); 
          setOrderDetails(orderResponse.data);
          console.log(orderResponse);
          
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
        Commande numéro {orderDetails?.id}
      </h1>
      <p className="text-center mb-8">Date de la commande : {orderDetails?.date}</p>
      
      <div className="space-y-8">
        {orderLines.map((orderLine) => (
          <div key={orderLine.id} className="bg-gray-200 p-4 rounded-md shadow-md">
            <p className="mb-2">
              <strong>Nom du projet :</strong> {project?.name}
            </p>
            <p className="mb-2">
              <strong>Nom de l'arbre :</strong> {orderLine.project_tree_id}
            </p>
            <p className="mb-2">
              <strong>Montant Unitaire :</strong> {orderLine.amount} €
            </p>
            <div className="flex justify-between">
              <p><strong>Quantité :</strong> {orderLine.quantity}</p>
              <p><strong>Montant Total :</strong> {orderLine.amount} €</p>
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
