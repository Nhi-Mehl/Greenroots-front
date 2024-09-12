// Ce fichier est responsable du stockage du User Context.
// Il fournit un composant UserProvider qui encapsule l'application et fournit user object.
// et une fonction pour définir user object sur le reste de l'application.
// Le hook useUser personnalisé est utilisé pour accéder à user object et à la fonction setUser à partir de UserContext.
import { createContext, useContext, useState } from 'react';
import { IUser } from '../@types';

interface UserContextType {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
}

// La création du contexte avec la valeur par défaut
const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

// Le hook personnalisé pour accéder à user object et à la fonction setUser
// Il n'est pas obligatoire d'utiliser ce hook, vous pouvez utiliser le contexte directement si vous préférez
// Mais l'utilisation de useUser() dans d'autres composants est plus lisible que l'utilisation de useContext(UserContext)
// Ce hook n'est qu'un wrapper autour de useContext(UserContext)
// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// Ce UserProvider est nécessaire pour que main.tsx puisse encapsuler l'intégralité de l'application.
// Il permet à user object d'être disponible dans toute l'application.
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
