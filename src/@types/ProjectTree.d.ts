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
