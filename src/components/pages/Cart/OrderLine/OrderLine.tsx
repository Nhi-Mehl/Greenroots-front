import { FaPlus, FaMinus } from 'react-icons/fa6';
// import { FaTrash } from 'react-icons/fa';

import { IProjectTreeSpecies } from '../../../../@types';

interface OrderLineProps {
  item: {
    tree: IProjectTreeSpecies;
    projectName: string;
    quantity: number;
  };
  onIncrement: () => void;
  onDecrement: () => void;
  // onRemove: () => void;
}

function OrderLine({
  item,
  onIncrement,
  onDecrement,
  // onRemove,
}: OrderLineProps) {
  return (
    <article
      className="flex flex-col gap-4 items-center sm:items-stretch bg-white shadow-md p-6 mb-4 rounded-lg"
      aria-label={`Article ${item.tree.species.name}`}
    >
      {/* Nom du projet */}
      <h2 className="h2-title text-center sm:text-left font-semibold text-gray-800">
        {item.projectName}
      </h2>

      {/* Nom de l'arbre */}
      <p className="text-xl sm:text-2xl text-gray-600">
        {item.tree.species.name}
      </p>

      {/* Ligne prix, quantité, total */}
      <div
        className="text-xl sm:text-2xl flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between items-center"
        role="group"
        aria-labelledby="order-line-details"
      >
        {/* Prix */}
        <p className="text-gray-600 font-medium">{item.tree.species.price} €</p>

        {/* Boutons d'incrémentation et décrémentation */}
        <div className="flex items-center gap-4 border border-gray-300 text-gray-600 px-4 py-2">
          <button
            type="button"
            onClick={onDecrement}
            aria-label="Diminuer la quantité"
          >
            <FaMinus size={20} color="text-gray-600" />
          </button>
          <span className="font-medium" aria-live="polite">
            {item.quantity}
          </span>
          <button
            type="button"
            onClick={onIncrement}
            aria-label="Augmenter la quantité"
          >
            <FaPlus size={20} color="text-gray-600" />
          </button>
        </div>

        {/* Total */}
        <p
          className="text-greenRegular font-bold"
          aria-label={`Total : ${(item.tree.species.price * item.quantity).toFixed(2)} €`}
        >
          Total: {(item.tree.species.price * item.quantity).toFixed(2)} €
        </p>
      </div>

      {/* Bouton de suppression */}
      {/* <button
        type="button"
        className="text-red-600 sm:self-end"
        onClick={onRemove}
        aria-label="Supprimer l'article"
      >
        <FaTrash size={20} />
      </button> */}
    </article>
  );
}

export default OrderLine;
