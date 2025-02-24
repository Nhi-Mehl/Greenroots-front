export interface IProject {
  id: number;
  name: string;
  description: string;
  status: string;
  picture: string;
  city: string;
  country: string;
  continent: string;
  createdAt?: string;
  updatedAt?: string;
}

export type InitialProjectState = {
  project: IProject;
};
