import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/index';
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
        const response = await api.get(`/projects/${id}`);

        if (response.status === 200) {
          setProject(response.data);
        }
      } catch (error: import('axios').AxiosError | unknown) {
        if (axios.isAxiosError(error)) {
          alert(error?.response?.data.message);
        }
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
        const treesResponse = await api.get(`/project_trees/${id}`);

        if (treesResponse.status === 200) {
          setProjectTrees(treesResponse.data);
        }

        const totalQuantity = treesResponse.data.reduce(
          (total: number, tree: IProjectTreesWithSpecies) =>
            total + tree.basic_quantity,
          0
        );
        setTotalBasicQuantity(totalQuantity);
      } catch (error: import('axios').AxiosError | unknown) {
        if (axios.isAxiosError(error)) {
          alert(error?.response?.data.message);
        }
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
    <main>
      <section className="p-8 m-12 bg-greenLight text-white h-76 max-w-max">
        <h2 className="h3-title p-4 text-m text-center lg:text-4xl">
          Objectif : {totalBasicQuantity} arbres
        </h2>
        <p className="p-4 text-sm text-justify lg:px-20 lg:text-xl">
          {project !== null && project.description}
        </p>
      </section>
      <section className="mx-auto my-9 flex flex-col items-center gap-8 lg:gap-12 2xl:gap-24 lg:flex-row lg:justify-center lg:flex-wrap">
        {projectTrees.map((tree) => (
          <article
            key={tree.id}
            className="w-4/5 lg:w-1/4 h-full flex flex-col justify-between bg-orange-50 shadow-lg "
          >
            <img
              className="w-full h-72 object-cover"
              src={`/images/species/${tree.species.picture}.webp`}
              alt="Illustration de l'arbre à planté"
            />
            <div className="p-4  flex flex-col text-center gap-6">
              <h3 className="text-2xl m-auto">{tree.species.name}</h3>
              <button
                className="p-2 bg-transparent border-solid border-2 border-greenRegular"
                type="button"
                onClick={() => handleAddToCart(tree)}
              >
                Ajouter au panier
              </button>
              <button
                className="btn m-auto mb-4"
                type="button"
                onClick={() => handleDetailTree(tree, project.name)}
              >
                Détails
              </button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
export default ProjectDetails;
