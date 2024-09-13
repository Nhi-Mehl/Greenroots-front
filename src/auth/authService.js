const logout = async () => {
  localStorage.removeItem('token'); // Supprimer le token du localStorage
  // Ajouter ici d'autres actions à réaliser lors du logout (e.g., redirection)
};

export default logout;
