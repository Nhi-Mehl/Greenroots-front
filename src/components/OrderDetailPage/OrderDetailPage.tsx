function OrderDetailPage() {
  return (
    <main className="w-max-7xl">
      <h3 className="h3-title">Commande numéro 0010</h3>
      <time>Date de la commande : 29/08/2024</time>
      <ul>
        <li>
          <p>
            Nom du projet <span>Reforestation Amazonie</span>
          </p>
          <p>
            Nom de l’arbre <span>Eucalyptus</span>
          </p>

          <p>
            <strong>Prix unitaire :</strong> <data value="15">15 €</data> X
            <strong>Quantité :</strong> <span>3</span> =<strong>Total :</strong>
            <data value="45">45 €</data>
          </p>

          <p>
            Montant Unitaire X Quantité = <data value="45">45 €</data>
          </p>
        </li>
      </ul>
    </main>
  );
}

export default OrderDetailPage;
