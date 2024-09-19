import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import LoginPage from '../src/components/LoginPage/LoginPage';
import { useUser, UserProvider } from '../src/context/UserContext';
import { ProjectProvider } from '../src/context/ProjectContext';
import { CartProvider } from '../src/components/Cart/CartContext/CartContext';
import api from '../src/api/index';

// Mock the navigate function from react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
    useLocation: () => ({
      state: {},
    }),
  };
});

// Création d'un routeur mémoire pour les tests
const router = createMemoryRouter(
  [
    {
      path: '/login',
      element: <LoginPage />,
    },
  ],
  {
    initialEntries: ['/login'], // Définir la route initiale sur /login
  }
);

// Fonction utilitaire pour envelopper le rendu avec les providers
const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <UserProvider>
      <ProjectProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </ProjectProvider>
    </UserProvider>
  );
};

describe('Login component security tests', () => {
  it('devrait afficher le formulaire de connexion', () => {
    renderWithProviders(<LoginPage />); // Utilisation du wrapper personnalisé

    // Vérifier que les éléments du formulaire sont bien rendus
    expect(screen.getByPlaceholderText('Votre email')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Votre mot de passe')
    ).toBeInTheDocument();
    expect(screen.getByText('Connexion')).toBeInTheDocument();
  });
});
