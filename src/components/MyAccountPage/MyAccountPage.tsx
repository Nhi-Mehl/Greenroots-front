import { useNavigate, Navigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

function MyAccountPage() {
  const navigate = useNavigate();
  const { user } = useUser();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div>
      <h2 className="h2-title text-center mt-10">Mom Compte</h2>
      <p className="text-center sectionText">Bonjour {user.first_name}</p>
      <div className="flex gap-10 justify-center my-20">
        <button
          className="btn"
          type="button"
          onClick={() => {
            navigate(`/my-account/orders/${user.id}`);
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
        <button
          className="btn"
          type="button"
          //   onClick={() => {
          //     navigate(`/my-account/profile/${user.id}`);
          //   }}
        >
          Déconnexion
        </button>
      </div>
    </div>
  );
}

export default MyAccountPage;
