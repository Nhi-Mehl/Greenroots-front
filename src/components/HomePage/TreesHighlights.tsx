import axios from 'axios';
import { useEffect, useState } from 'react';
import api from '../../api/index';
import { ISpecies } from '../../@types';

function TreesHighlights() {
  const [treesHighlights, setTreeHighlighs] = useState<ISpecies[]>([]);

  const getTreesHighlights = async () => {
    try {
      const response = await api.get('/projects/highlights');

      console.log(response);

      if (response.status === 200) {
        setTreeHighlighs(response.data);
      }
    } catch (error: import('axios').AxiosError | unknown) {
      if (axios.isAxiosError(error)) {
        alert(error?.response?.data.message);
      }
    }
  };

  useEffect(() => {
    console.log('TreesHighlights', TreesHighlights);
    getTreesHighlights();
  }, []);

  return (
    <>
      <h1 className="h1-title text-center mt-10 lg:text-5xl lg:mt-24">
        Nos arbres les plus populaires
      </h1>
      <div className="lg:flex">
        {treesHighlights.map((tree) => (
          <article
            key={tree.id}
            className="max-w-max m-auto my-20 bg-beige shadow-lg sm:max-w-sm lg:max-w-lg lg:mt-24"
          >
            <img
              className="w-full object-cover lg:w-lg lg:max-h-80"
              src={`/images/species/${tree.picture}.webp`}
              alt={tree.name}
            />
            <h2 className="h2-title text-center mt-10">{tree.name}</h2>
            <p className="mt-10 px-10 text-justify">{tree.description}</p>
            <div className="flex justify-between items-center p-10">
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl">5€</p>
              <button className="btn lg:text-lg" type="button">
                Planter
              </button>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

export default TreesHighlights;
