import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

interface ITreeSpecies {
  id: number;
  name: string;
  scientific_name: string;
  description: string;
  price: string;
  picture: string;
  co2_compensation: string;
}

interface IProjectTree {
  id: number;
  basic_quantity: number;
  current_quantity: number;
  species_id: number;
  species: ITreeSpecies[];
}

interface IProject {
  id: number;
  name: string;
  description: string;
  picture: string;
  status: string;
  city: string;
  country: string;
  continent: string;
  project_trees: IProjectTree[];
}
const createSlug = (name: string) => {
  return name
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
}; // Renommé en IProject

function ProjectDetails() {
  const { id } = useParams();
  const [project, SetProject] = useState<IProject | null>(null);
  const [projectTrees, setProjectTrees] = useState<IProjectTree[]>([]);
  const [totalBasicQuantity, setTotalBasicQuantity] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjetDetails = async () => {
      try {
        // Fetch projet details and project_trees in parallel
        const treesResponse = await fetch(
          `http://localhost:3000/api/projects/${id}/project_trees`
        );

        const data: IProject = await treesResponse.json();
        SetProject(data);

        const treesData = data.project_trees || [];

        const totalQuantity = treesData.reduce(
          (total: number, tree) => total + tree.basic_quantity,
          0
        );
        setTotalBasicQuantity(totalQuantity);
        setProjectTrees(treesData);
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    };

    fetchProjetDetails();
  }, [id]); // Utilisez `id` comme dépendance unique
  if (!project)
    return (
      <p className="text-4xl text-center w-full ">
        En chargement veuillez patientez S&apos;il vous plait pitie je t&apos;en
        supplie attend regarde ce que j&apos;ai fais ...
      </p>
    );
  const handleAddToCart = (tree: IProjectTree) => {
    const cart = localStorage.getItem('cart');
    let cartItems: {
      tree: IProjectTree;
      quantity: number;
      projectName: string;
    }[] = cart ? JSON.parse(cart) : [];
    const existingItem = cartItems.find(
      (item) =>
        item.tree.id === tree.id && item.tree.species.id === tree.species.id
    );
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({ tree, quantity: 1, projectName: project.name });
    }

    localStorage.setItem('cart', JSON.stringify(cartItems));

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Ajouter au panier',
      showConfirmButton: false,
      timer: 2000,
    });
  };
  const handleDetailTree = (tree: object) => {
    const slug = createSlug(tree.species.name);
    navigate(`/tree/${tree.id}/${slug}`, { state: { tree } });
  };
  return (
    <div>
      <div className="p-4 m-16 bg-greenLight text-white h-76 max-w-max ">
        <h1 className="text-5xl m-auto">{project.name}</h1>
        <h2 className="h3-title p-4 text-m text-center">
          Objectif : {totalBasicQuantity} arbres
        </h2>
        <p className="p-4 text-s text-justify ">{project.description}</p>
      </div>
      <div className="m-9 flex flex-row justify-around flex-wrap">
        {projectTrees.map((tree) => (
          <div key={tree.id} className="m-6 flex h-full max-w-80 shadow-lg  ">
            <article className="flex flex-col justify-between bg-orange-50">
              <img
                className=" w-80 h-72"
                src={`/images/species/${tree.species.picture}.webp`}
                alt="Illustration de l'arbre à planté"
              />
              <div className="p-4  flex flex-col text-center gap-6">
                <h2 className="text-2xl m-auto">{tree.species.name}</h2>
                <button
                  className="p-2 bg-transparent border-solid border-2 border-greenRegular"
                  type="button"
                  onClick={() => handleAddToCart(tree)}
                >
                  Ajouter au panier
                </button>
                <button
                  className="text-xs text-white w-2/5 rounded-lg bg-green-700 p-2 m-auto mb-4"
                  type="button"
                  onClick={() => handleDetailTree(tree)}
                >
                  Détails
                </button>
              </div>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
}
export default ProjectDetails;
