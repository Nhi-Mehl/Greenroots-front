import { useNavigate, Navigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

function MyAccountPage() {
  const navigate = useNavigate();

  const { user, setUser } = useUser();
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = async () => {
    localStorage.removeItem('token'); // On supprime le token du stockage local
    setUser(null); // On réinitialise l'utilisateur dans le contexte
    navigate(-1); // Ou pour rediriger vers une page spécifique
    // navigate('/my-account');
  };

  return (
    <div>
      <h2 className="h2-title text-center mt-10">Mon Compte</h2>
      <p className="text-center sectionText">Bonjour {user.first_name}</p>
      <div className="flex gap-10 justify-center my-20">
        <button
          className="btn"
          type="button"
          onClick={() => {
            navigate('/userdetails');
          }}
        >
          Mon profil
        </button>
        <button
          className="btn"
          type="button"
          onClick={() => {
            navigate(`/my-account/profile/${user.id}`);
          }}
        >
          Mes commandes
        </button>
        <button className="btn" type="button" onClick={handleLogout}>
          Déconnexion
        </button>
      </div>
    </div>
  );
}

export default MyAccountPage;
