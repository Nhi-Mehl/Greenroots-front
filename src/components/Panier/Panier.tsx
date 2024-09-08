import { useEffect, useState } from 'react';
import OrderLine from './OrderLine/OrderLine';

interface ITreeSpecies {
  id: number;
  name: string;
  scientific_name: string;
  description: string;
  price: string;
  picture: string;
  co2_compensation: string;
}

interface IProjectTree {
  id: number;
  basic_quantity: number;
  current_quantity: number;
  species_id: number;
  species: ITreeSpecies[];
}

function Panier() {
  const [cartItems, setCartItems] = useState<{ tree: IProjectTree }[]>([]);

  useEffect(() => {
    const cart = localStorage.getItem('cart');
    if (cart) {
      setCartItems(JSON.parse(cart));
    }
  }, []);
  const totalAmount = cartItems.reduce((acc, item) => {
    return acc + parseFloat(item.tree.species.price) * item.quantity;
  }, 0);

  return (
    <div>
      <div className="w-full p-10 text-center text-4xl font-bold">
        <h1>Votre Panier</h1>
      </div>
      <div>
        {cartItems.length === 0 ? (
          <p className="w-full p-10 text-center text-3xl">
            Votre panier est vide
          </p>
        ) : (
          <div>
            {cartItems.map((item) => (
              <OrderLine key={item.tree.id} item={item} />
            ))}
          </div>
        )}
      </div>
      {cartItems.length > 0 && (
        <div className="w-full p-6 text-end text-green-600 text-2xl font-bold">
          <p>Total: {totalAmount.toFixed(2)} €</p>
        </div>
      )}

      <div className="m-auto text-center p-10">
        <button
          type="submit"
          className="w-1/4 p-2 rounded-3xl text-white text-2xl bg-green-600"
        >
          Payer
        </button>
      </div>
    </div>
  );
}

export default Panier;
