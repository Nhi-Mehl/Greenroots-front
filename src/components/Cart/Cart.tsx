import { useContext } from 'react';
import { CartContext } from '../Cart/CartContext/CartContext';
import OrderLine from './OrderLine/OrderLine';
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

interface ITreeSpecies {
  id: number;
  name: string;
  scientific_name: string;
  description: string;
  price: number;
  picture: string;
  co2_compensation: number;
}

interface IProjectTree {
  id: number;
  basic_quantity: number;
  current_quantity: number;
  species_id: number;
  species: ITreeSpecies[];
}

function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
  const { user } = useUser();
  const navigate = useNavigate();

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + parseFloat(item.tree.species.price) * item.quantity,
    0
  );
  const handlePay = async () => {
    if (!user) {
      navigate('/login');
    } else {
      const orderData = {
        amount: totalAmount,
        orderLine: cartItems.map((item) => ({
          project_tree_id: item.tree.species.id,
          quantity: item.quantity,
          amount: Number(item.tree.species.price),
        })),
      };
      navigate('/payment', { state: { orderData } });
    }
  };

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
            {cartItems.map((item, index) => (
              <OrderLine
                key={item.tree.id}
                item={item}
                onIncrement={() =>
                  updateQuantity(item.tree.id, item.quantity + 1)
                }
                onDecrement={() =>
                  item.quantity > 1
                    ? updateQuantity(item.tree.id, item.quantity - 1)
                    : removeFromCart(item.tree.id)
                }
                onRemove={() => removeFromCart(item.tree.id)}
              />
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
          onClick={handlePay}
        >
          Payer
        </button>
      </div>
    </div>
  );
}

export default Cart;
