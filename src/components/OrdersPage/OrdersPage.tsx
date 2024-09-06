function OrdersPage() {
  return (
    <main className="max-w-7xl mx-auto p-10">
      <h1 className="text-center h2-title">Mes commandes</h1>
      <ul>
        <li className="flex justify-between items-center mt-20 py-6 px-10 bg-beige">
          <p>Commande</p>
          <p>Numéro</p>
          <time>Date</time>
          <data>Montant</data>
          <button className="btn" type="button">
            Consulter
          </button>
        </li>
      </ul>
    </main>
  );
}

export default OrdersPage;
