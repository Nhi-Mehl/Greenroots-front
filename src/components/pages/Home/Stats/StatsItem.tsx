import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// Définition du type des propriétés du composant StatItem
interface StatItemProps {
  title: string; // Le titre de la statistique affichée
  value?: number; // La valeur de la statistique (optionnelle car en attente de chargement)
  isLoading: boolean; // Indique si les données sont en cours de chargement
}

/**
 * Composant StatItem
 * ---------------------------
 * Affiche une statistique sous forme de titre + valeur.
 * Si les données ne sont pas encore chargées, un skeleton est affiché à la place.
 */
const StatItem = ({ title, value, isLoading }: StatItemProps) => {
  /**
   * Fonction utilitaire pour formater un nombre avec le format français.
   * Si la valeur est indéfinie, elle renvoie "N/A" pour indiquer un manque de données.
   */
  const formatNumber = (num?: number) =>
    num ? new Intl.NumberFormat('fr-FR').format(num) : 'N/A';

  return (
    <div className="mt-4 lg:mt-16 text-center">
      {/* Titre de la statistique */}
      <h3 className="text-sm sm:text-xl md:text-2xl lg:text-4xl">{title}</h3>

      {/* Affichage du nombre ou du skeleton si en cours de chargement */}
      <p
        className="text-2xl md:text-3xl lg:text-5xl mt-4"
        aria-live="polite"
        aria-busy={isLoading}
      >
        {isLoading ? <Skeleton width={200} height={30} /> : formatNumber(value)}
      </p>
    </div>
  );
};

export default StatItem;
