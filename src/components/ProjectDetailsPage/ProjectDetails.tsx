import { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { CartContext } from '../Cart/CartContext/CartContext';
import { useProject } from '../../context/ProjectContext';
import { ISpecies, IProjectTree } from '../../@types';

interface IProjectTreesWithSpecies extends IProjectTree {
  species: ISpecies; // L'arbre contient également une espèce
}

const createSlug = (name: string) => {
  return name
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
}; // Renommé en IProject

function ProjectDetails() {
  const { id } = useParams();

  // Stockage détail un projet selon son ID dans le State
  const { project, setProject } = useProject();
  // Stockage les arbres un projet dans le State
  const [projectTrees, setProjectTrees] = useState<IProjectTreesWithSpecies[]>(
    []
  );
  // Stockage les quantités arbres total un projet dans le State
  const [totalBasicQuantity, setTotalBasicQuantity] = useState<number>(0);
  const navigate = useNavigate();

  const { addToCart } = useContext(CartContext);
  console.log('addToCart:', addToCart);

  // Récupération un projet selon son id d'API

  // Affiché les détails un projet au premier rendu
  useEffect(() => {
    const getOneProject = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/projects/${id}`
        );
        const data = await response.json();
        console.log(data);
        setProject(data);
      } catch (error) {
        console.error('Error fetching matière:', error);
      }
    };
    console.log("application de l'effet rendu détaile un projet");
    getOneProject();
  }, [id, setProject]);

  useEffect(() => {
    console.log("application de l'effet rendu les arbres un projet");
    // Récupération des arbres d'un projet d'API
    const getTreesProject = async () => {
      try {
        const treesResponse = await fetch(
          `http://localhost:3000/api/project_trees/${id}`
        );

        const data = await treesResponse.json();
        setProjectTrees(data);

        const totalQuantity = data.reduce(
          (total: number, tree: IProjectTreesWithSpecies) =>
            total + tree.basic_quantity,
          0
        );
        setTotalBasicQuantity(totalQuantity);
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    };

    getTreesProject();
  }, [id]); // Utilisez `id` comme dépendance unique

  if (!project)
    return (
      <p className="text-4xl text-center w-full ">
        En chargement veuillez patientez S&apos;il vous plait pitie je t&apos;en
        supplie attend regarde ce que j&apos;ai fais ...
      </p>
    );

  const handleAddToCart = (tree: IProjectTree) => {
    console.log('handleAddToCart called');
    if (!addToCart) {
      console.error('addtoCart is not defined');
      return;
    }
    const projectName = project.name;
    console.log('ProjectName:', projectName);
    addToCart(tree, projectName);

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Ajouter au panier',
      showConfirmButton: false,
      timer: 2000,
    });
  };
  const handleDetailTree = (tree: IProjectTreesWithSpecies) => {
    const projectName = project.name;
    const slug = createSlug(tree.species.name);
    navigate(`/tree/${tree.id}/${slug}`, { state: { tree, projectName } });
  };
  return (
    <div>
      <div className="p-8 m-12 bg-greenLight text-white h-76 max-w-max ">
        <h2 className="h3-title p-4 text-m text-center lg:text-4xl">
          Objectif : {totalBasicQuantity} arbres
        </h2>
        <p className="p-4 text-sm text-justify lg:px-20 lg:text-xl">
          {project !== null && project.description}
        </p>
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
                  onClick={() => handleDetailTree(tree, project.name)}
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
