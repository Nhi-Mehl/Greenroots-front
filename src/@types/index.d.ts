export interface Project {
    id: number;
    name: string;
    description: string;
    status: string;
    city: string;
    country: string;
    continent: string;
  }
  
  export interface TreeProject {
    id: number;
    basic_quantity: number;
    current_quantity: number;
    project_id: number;
    tree_id: number;
  }
  
  export interface Species {
    id: number;
    name: string;
    scientific_name: string;
    description: string;
    price: number;
    picture: string;
    co2_compensation: number;
  }
  
  export interface User {
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
  }
  
  export interface Order {
    id: number;
    amount: number;
    date: string;
    user_id: number;
  }
  
  export interface OrderLine {
    id: number;
    quantity: number;
    amount: number;
    project_tree_id: number;
    order_id: number;
  }