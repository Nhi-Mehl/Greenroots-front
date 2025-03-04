import { useState, useEffect } from 'react';

/**
 * Simule un chargement asynchrone avec un délai donné.
 * @param delay Temps en millisecondes avant de désactiver le chargement (ex: 2000 pour 2 secondes)
 * @returns {boolean} `true` si en cours de chargement, `false` sinon.
 */
const useFakeLoading = (delay = 2000) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), delay);
    return () => clearTimeout(timer); // Nettoyage du timer si le composant est démonté
  }, [delay]);

  return isLoading;
};

export default useFakeLoading;
