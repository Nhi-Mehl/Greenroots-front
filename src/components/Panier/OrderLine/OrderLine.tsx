function OrderLine({ item }) {
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

          {/* Quantité */}
          <div className="text-gray-700 text-2xl font-medium">
            x {item.quantity}
          </div>

          {/* Total */}
          <div className="text-green-600 text-2xl font-bold">
            {(parseFloat(item.tree.species.price) * item.quantity).toFixed(2)} €
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderLine;
