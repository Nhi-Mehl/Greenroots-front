import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

interface OrderLine {
  item: {
    projectName: string;
    tree: {
      species: {
        name: string;
        price: string; // ou number, selon la structure de vos données
      };
    };
    quantity: number;
  };
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
}

function OrderLine({ item, onIncrement, onDecrement, onRemove }) {
  return (
    <div>
      <div className="flex flex-col bg-white shadow-md p-6 mb-4 rounded-lg">
        {/* Nom du projet */}
        <div className="text-3xl font-semibold text-gray-800 mb-2">
          {item.projectName}
        </div>

        {/* Nom de l'arbre */}
        <div className="text-2xl text-gray-600 mb-4">
          {item.tree.species.name}
        </div>

        {/* Ligne prix, quantité, total */}
        <div className="flex justify-between items-center">
          {/* Prix */}
          <div className="text-gray-700 text-2xl font-medium">
            {item.tree.species.price} €
          </div>
          {/* Boutons d'incrémentation et décrémentation */}
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={onDecrement}
              className="px-3 py-1 bg-gray-200 text-xl"
            >
              -
            </button>
            <div className="text-gray-700 text-2xl font-medium">
              x {item.quantity}
            </div>
            <button
              type="button"
              onClick={onIncrement}
              className="px-3 py-1 bg-gray-200 text-xl"
            >
              +
            </button>
          </div>

          {/* Total */}
          <div className="text-green-600 text-2xl font-bold">
            {(parseFloat(item.tree.species.price) * item.quantity).toFixed(2)} €
          </div>
        </div>
        <div className="mt-4 text-right">
          <button
            type="button"
            onClick={onRemove}
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderLine;
