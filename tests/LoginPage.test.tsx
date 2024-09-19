import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { RouterProvider, createMemoryRouter } from 'react-router-dom'; // Utilisation du router mémoire pour les tests
import { describe, it, expect, vi } from 'vitest';
import LoginPage from '../src/components/LoginPage/LoginPage';
import { useUser, UserProvider } from '../src/context/UserContext';
import { ProjectProvider } from '../src/context/ProjectContext';
import { CartProvider } from '../src/components/Cart/CartContext/CartContext';
import api from '../src/api/index';
import React from 'react';

// Mocking `useUser` et `api`
vi.mock('../src/context/UserContext', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useUser: vi.fn(),
  };
});

vi.mock('.../src/api/index', () => ({
  post: vi.fn(),
  get: vi.fn(),
}));

let setUserMock: ReturnType<typeof vi.fn>;

beforeEach(() => {
  setUserMock = vi.fn();
  (useUser as ReturnType<typeof vi.fn>).mockReturnValue({
    setUser: setUserMock,
    user: null,
  });
  window.alert = vi.fn(); // Mock alert pour tous les tests
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

  it('devrait permettre la saisie des champs email et mot de passe', () => {
    renderWithProviders(<LoginPage />); // Utilisation du wrapper personnalisé

    const emailInput = screen.getByPlaceholderText('Votre email');
    const passwordInput = screen.getByPlaceholderText('Votre mot de passe');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  it('devrait soumettre le formulaire avec les bonnes données', async () => {
    // Utilisation correcte de vi.fn() pour le mock
    (api.post as vitest.Mock).mockResolvedValue({
      status: 200,
      data: { accessToken: 'mockToken', id: 1 },
    });
    (api.get as vitest.Mock).mockResolvedValue({
      status: 200,
      data: { id: 1, frist_name: 'John', last_name: 'Doe' },
    });

    renderWithProviders(<LoginPage />); // Utilisation du wrapper personnalisé

    const emailInput = screen.getByPlaceholderText('Votre email');
    const passwordInput = screen.getByPlaceholderText('Votre mot de passe');
    const submitButton = screen.getByText('Connexion');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith('/auth/login', {
        email: 'test@example.com',
        password: 'password123',
      });
    });

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith('/users/1');
    });

    await waitFor(() => {
      expect(setUserMock).toHaveBeenCalledWith({
        id: 1,
        frist_name: 'John',
        last_name: 'Doe',
      });
    });
  });

  it("devrait afficher une alerte en cas d'erreur API", async () => {
    (api.post as ReturnType<typeof vi.fn>).mockRejectedValue({
      response: { data: { message: 'Invalid credentials' } },
    });

    // Mock alert
    window.alert = vi.fn();

    renderWithProviders(<LoginPage />); // Utilisation du wrapper personnalisé

    const emailInput = screen.getByPlaceholderText('Votre email');
    const passwordInput = screen.getByPlaceholderText('Votre mot de passe');
    const submitButton = screen.getByText('Connexion');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Invalid credentials');
    });
  });
});
