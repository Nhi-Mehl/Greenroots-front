export interface IProject {
  id: number;
  name: string;
  description: string;
  status: string;
  picture: string;
  city: string;
  country: string;
  continent: string;
}

export interface IProjectTree {
  id: number;
  basic_quantity: number;
  current_quantity: number;
  project_id: number;
  tree_id: number;
}

export interface ISpecies {
  id: number;
  name: string;
  scientific_name: string;
  description: string;
  price: number;
  picture: string;
  co2_compensation: number;
}

export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  role: string;
  address: string;
  zip_code: string;
  city: string;
  country: string;
  phone_number: string;
  email: string;
  password: string;
  confirmation: string;
}

export interface IOrder {
  id: number;
  amount: number;
  date: string;
  user_id: number;
}

export interface IOrderLine {
  id: number;
  quantity: number;
  amount: number;
  project_tree_id: number;
  order_id: number;
}
