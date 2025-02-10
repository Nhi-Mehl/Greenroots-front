export interface IOrder {
  id: number;
  amount: number;
  date: string;
  user_id: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface IOrderLine {
  id: number;
  quantity: number;
  amount: number;
  project_tree_id: number;
  order_id: number;
  createdAt?: string;
  updatedAt?: string;
}

// Types données de la réponse de la création d'une commande
export interface CreateOrderResponse {
  message: string;
  newOrder: IOrder;
  newOrderLines: IOrderLine[];
}
