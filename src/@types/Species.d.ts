export interface ISpecies {
  id: number;
  name: string;
  scientific_name: string;
  description: string;
  price: number;
  picture: string;
  co2_compensation: number;
  createdAt?: string;
  updatedAt?: string;
}
