/**
 * Génère un slug à partir d'un nom donné.
 * @param name Nom à convertir en slug.
 * @returns Slug formaté.
 */
const createSlug = (name: string) => {
  return name
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
};

export default createSlug;
