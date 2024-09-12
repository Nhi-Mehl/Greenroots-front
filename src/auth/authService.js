// src/services/authService.js
import api from '../api/index';

const logout = async () => {
  try {
    await api.post('/logout'); // Exemple de requête pour invalider la session côté serveur
    localStorage.removeItem('token'); // Supprimer le token du localStorage
    // Ajouter ici d'autres actions à réaliser lors du logout (e.g., redirection)
  } catch (error) {
    console.error('Failed to logout:', error);
  }
};

export default logout;
