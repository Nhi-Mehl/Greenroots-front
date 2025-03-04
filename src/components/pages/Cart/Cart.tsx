import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import Button from '../../Form/Button/Button';
import OrderLine from './OrderLine/OrderLine';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { selectCurrentUser } from '../../../store/features/auth/authSlice';
import {
  selectCart,
  removeFromCart,
  updateQuantityCartItem,
} from '../../../store/features/cart/cartSlice';

/**
 * Page du panier affichant les articles sélectionnés par l'utilisateur.
 * Permet de modifier la quantité des articles, de les supprimer et de passer à la commande.
 */
function CartPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // Récupérer l'utilisateur connecté de la store Redux
  const user = useAppSelector(selectCurrentUser);
  // Récupérer les articles du panier de la store Redux
  const cartItems = useAppSelector(selectCart);

  // Calcul du montant total du panier
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.tree.species.price * item.quantity,
    0
  );

  /**
   * Gestion du clic sur le bouton de paiement.
   * Redirige vers la page de connexion si l'utilisateur n'est pas connecté,
   * sinon passe à la page de paiement avec les détails de la commande.
   */
  const handlePay = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    const orderData = {
      totalAmountOrder: totalAmount,
      orderLine: cartItems.map((item) => ({
        project_tree_id: item.tree.id,
        project_tree_name: item.tree.species.name,
        project_tree_picture: item.tree.species.picture,
        projet_name: item.projectName,
        quantity: item.quantity,
        amount: Number(item.tree.species.price) * item.quantity,
      })),
    };

    navigate('/checkout', { state: { orderData } });
  };

  /**
   * Gestion du clic sur le bouton de suppression d'un article.
   * Affiche une boîte de dialogue de confirmation avant de supprimer l'article.
   */
  const onRemoveTree = (id: number) => {
    // Afficher une boîte de dialogue de confirmation avant de supprimer l'article
    Swal.fire({
      title: 'Supprimer un article',
      text: 'Voulez-vous vraiment supprimer cet article de votre panier ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Supprimer',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.isConfirmed) {
        // Si l'utilisateur confirme la suppression, appel de la fonction removeFromCart
        dispatch(removeFromCart(id));
      }
    });
  };

  return (
    <main className="min-h-screen">
      <h1 className="h1-title text-center my-10 sm:my-20">Votre Panier</h1>

      {/* Liste des articles */}
      <section className="w-3/4 mx-auto">
        {cartItems.length === 0 ? (
          <p className="w-full p-10 text-center text-3xl" role="alert">
            Votre panier est vide
          </p>
        ) : (
          <ul aria-label="Liste des articles dans le panier">
            {cartItems.map((item) => (
              <OrderLine
                key={item.tree.id}
                item={item}
                onIncrement={() =>
                  dispatch(
                    updateQuantityCartItem({
                      id: item.tree.id,
                      quantity: item.quantity + 1,
                    })
                  )
                }
                onDecrement={() =>
                  item.quantity > 1
                    ? dispatch(
                        updateQuantityCartItem({
                          id: item.tree.id,
                          quantity: item.quantity - 1,
                        })
                      )
                    : onRemoveTree(item.tree.id)
                }
                // onRemove={() => onRemoveTree(item.tree.id)}
              />
            ))}
          </ul>
        )}
      </section>

      {cartItems.length > 0 && (
        <section className="w-3/4 my-12 sm:my-20 text-center mx-auto">
          <p className="text-xl sm:text-2xl text-greenRegular font-bold mb-5 sm:mb-10">
            Total de la commande:{' '}
            <span className="block sm:inline">{totalAmount.toFixed(2)} €</span>
          </p>
          {/* Bouton de paiement */}
          <Button
            type="submit"
            variant="form"
            className="w-full sm:max-w-[400px]"
            onClick={handlePay}
          >
            Payer
          </Button>
        </section>
      )}
    </main>
  );
}
export default CartPage;
