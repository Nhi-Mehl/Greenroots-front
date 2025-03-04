import { ISpecies } from './Species';

export interface IProjectTree {
  id: number;
  basic_quantity: number;
  current_quantity: number;
  project_id: number;
  species_id: number;
  createdAt?: string;
  updatedAt?: string;
}

export type IProjectTreeSpecies = IProjectTree & {
  species: ISpecies;
};

export type ProjectTreesResponse = {
  progress: number;
  trees: IProjectTreeSpecies[];
  totalBasicQuantity: number;
  totalCurrentQuantity: number;
};

export type ThreeMostBoughtTreesResponse = {
  id: number;
  bascic_quantity: number;
  co2_compensation: number;
  current_quantity: number;
  description: string;
  name: string;
  picture: string;
  price: number;
  project_id: number;
  sold_quantity: number;
  tree_name: string;
};
