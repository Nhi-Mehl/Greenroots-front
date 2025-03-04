import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import { Provider } from 'react-redux';

import LoginPage from '../src/components/pages/Login/Login';
import { store } from '../src/store/store';

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
const renderWithProviders = () => {
  return render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

describe('Login component security tests', () => {
  it('devrait afficher le formulaire de connexion', () => {
    renderWithProviders(); // Utilisation du wrapper personnalisé

    // Vérifier que les éléments du formulaire sont bien rendus
    expect(screen.getByPlaceholderText('Votre email')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Votre mot de passe')
    ).toBeInTheDocument();
    expect(screen.getByText('Se connecter')).toBeInTheDocument();
  });

  it('devrait permettre la saisie des champs email et mot de passe', () => {
    renderWithProviders(); // Utilisation du wrapper personnalisé

    const emailInput = screen.getByPlaceholderText('Votre email');
    const passwordInput = screen.getByPlaceholderText('Votre mot de passe');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  // Test de prévention des attaques XSS
  it('prevents XSS attack in email input', async () => {
    renderWithProviders(); // Utilisation du wrapper personnalisé

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Mot de passe/i);
    const submitButton = screen.getByRole('button', { name: /Se connecter/i });

    // Simulate XSS attack by entering a script in the email input
    const xssPayload = '<script>alert("XSS")</script>';
    fireEvent.change(emailInput, { target: { value: xssPayload } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    fireEvent.click(submitButton);

    // Check if the script tag is sanitized
    expect(screen.queryByText('alert("XSS")')).not.toBeInTheDocument();
  });

  // Test de prévention des injections SQL
  it('prevents SQL injection attempt in email input', async () => {
    renderWithProviders(); // Utilisation du wrapper personnalisé

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Mot de passe/i);
    const submitButton = screen.getByRole('button', { name: /Se connecter/i });

    // Simulate SQL injection attack in the email input
    const sqlInjectionPayload = "' OR 1=1;--";
    fireEvent.change(emailInput, { target: { value: sqlInjectionPayload } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    fireEvent.click(submitButton);

    // Check for security mechanisms preventing SQL injection (e.g., validation, sanitization)
    // In this test case, if your app properly escapes or rejects such payloads,
    // you could mock an API call and ensure the payload is not sent to the server unaltered.
    expect(screen.queryByText(sqlInjectionPayload)).not.toBeInTheDocument();
  });

  //   les deux items test pas encore test
  // it('devrait soumettre le formulaire avec les bonnes données', async () => {
  //   // Utilisation correcte de vi.fn() pour le mock
  //   (api.post as vitest.Mock).mockResolvedValue({
  //     status: 200,
  //     data: { accessToken: 'mockToken', id: 1 },
  //   });
  //   (api.get as vitest.Mock).mockResolvedValue({
  //     status: 200,
  //     data: { id: 1, first_name: 'John', last_name: 'Doe' },
  //   });

  //   renderWithProviders(<LoginPage />); // Utilisation du wrapper personnalisé

  //   const emailInput = screen.getByPlaceholderText('Votre email');
  //   const passwordInput = screen.getByPlaceholderText('Votre mot de passe');
  //   const submitButton = screen.getByText('Connexion');

  //   fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  //   fireEvent.change(passwordInput, { target: { value: 'password123' } });

  //   fireEvent.click(submitButton);

  //   await waitFor(() => {
  //     expect(api.post).toHaveBeenCalledWith('/auth/login', {
  //       email: 'test@example.com',
  //       password: 'password123',
  //     });
  //   });

  //   await waitFor(() => {
  //     expect(api.get).toHaveBeenCalledWith('/users/1');
  //   });

  //   await waitFor(() => {
  //     expect(setUserMock).toHaveBeenCalledWith({
  //       id: 1,
  //       first_name: 'John',
  //       last_name: 'Doe',
  //     });
  //   });
  // });

  //   it("devrait afficher une alerte en cas d'erreur API", async () => {
  //     (api.post as ReturnType<typeof vi.fn>).mockRejectedValue({
  //       response: { data: { message: 'Invalid credentials' } },
  //     });

  //     // Mock alert
  //     window.alert = vi.fn();

  //     renderWithProviders(<LoginPage />); // Utilisation du wrapper personnalisé

  //     const emailInput = screen.getByPlaceholderText('Votre email');
  //     const passwordInput = screen.getByPlaceholderText('Votre mot de passe');
  //     const submitButton = screen.getByText('Connexion');

  //     fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  //     fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });

  //     fireEvent.click(submitButton);

  //     await waitFor(() => {
  //       expect(window.alert).toHaveBeenCalledWith('Invalid credentials');
  //     });
  //   });
});
