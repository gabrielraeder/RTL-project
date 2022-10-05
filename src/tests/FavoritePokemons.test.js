import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('3. Teste o componente <FavoritePokemons.js />', () => {
  it('Testa se é exibida na tela a mensagem No favorite pokemon found', () => {
    renderWithRouter(<App />);
    const favsLink = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(favsLink).toBeInTheDocument();

    userEvent.click(favsLink);

    const heading = screen.getByRole('heading', { name: /Favorite pokémons/i, level: 2 });
    const text = screen.getByText(/No favorite pokemon found/i);

    expect(heading).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });
});

// testar incluir pokemon favoritos
