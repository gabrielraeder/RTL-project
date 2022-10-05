import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('6. Teste o componente <Pokemon.js />', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);

    const pokeName = screen.getByTestId('pokemon-name');
    const pokeType = screen.getByTestId('pokemon-type');
    const pokeWeight = screen.getByTestId('pokemon-weight');
    const pokeImg = screen.getByRole('img', { name: /pikachu sprite/i });

    expect(pokeName.textContent).toBe('Pikachu');
    expect(pokeType.textContent).toBe('Electric');
    expect(pokeWeight).toBeInTheDocument();
    expect(pokeWeight.textContent).toBe('Average weight: 6.0 kg');
    expect(pokeImg.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Teste se o card do pokémon indicado na Pokédex contém um link clicavel', () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /more details/i });
    expect(link).toBeInTheDocument();
    expect(link.href).toBe('http://localhost/pokemons/25');

    userEvent.click(link);

    expect(history.location.pathname).toBe('/pokemons/25');

    const favoriteCheck = screen.getByLabelText(/pokémon favoritado/i);
    expect(favoriteCheck).toBeInTheDocument();

    userEvent.click(favoriteCheck);

    const starImg = screen.getByRole('img', { name: /is marked as favorite/i });
    expect(starImg).toBeInTheDocument();
    expect(starImg.src).toBe('http://localhost/star-icon.svg');
  });

  // it('', () => {});
});
