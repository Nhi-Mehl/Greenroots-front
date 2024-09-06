function OrderDetailPage() {
  return (
    <main className="max-w-7xl mx-auto p-10">
      <h2 className="h2-title text-center">Commande numéro 0010</h2>
      <time className="block text-center sectionText ">
        Date de la commande : 29/08/2024
      </time>
      <ul className="my-10">
        <li className="p-6 bg-beige">
          <p className="mb-2">
            Nom du projet : <span>Reforestation Amazonie</span>
          </p>
          <p className="mb-2">
            Nom de l’arbre : <span>Eucalyptus</span>
          </p>
          <div className="flex justify-between">
            <p>
              Prix unitaire : <data value="15">15 €</data>
            </p>
            <p>
              Quantité : <data value="3">3</data>
            </p>
            <p>
              Total : <data value="45">45 €</data>
            </p>
          </div>
        </li>
      </ul>
    </main>
  );
}

export default OrderDetailPage;
