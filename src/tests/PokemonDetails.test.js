import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('7. Teste o componente <PokemonDetails.js />', () => {
  it('Informações detalhadas do pokémon são mostradas na tela', () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /more details/i });
    expect(link).toBeInTheDocument();

    userEvent.click(link);

    expect(history.location.pathname).toBe('/pokemons/25');
    expect(link).not.toBeInTheDocument();

    const heading = screen.getByRole('heading', { name: /pikachu details/i, level: 2 });
    expect(heading).toBeInTheDocument();

    const summary = screen.getByRole('heading', { name: /summary/i, level: 2 });
    expect(summary).toBeInTheDocument();

    const details = screen.getByText(/This intelligent Pokémon roasts/i);
    expect(details).toBeInTheDocument();
  });

  it('Seção com os mapas contendo as localizações do pokémon', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /more details/i });
    expect(link).toBeInTheDocument();

    userEvent.click(link);

    const location = screen.getByRole('heading', { name: /Game Locations/i, level: 2 });
    expect(location).toBeInTheDocument();

    const dataMaps = pokemons.map((poke) => poke.foundAt);
    const maps = screen.getAllByRole('img', { name: /pikachu location/i });
    expect(dataMaps[0].length).toEqual(maps.length);

    expect(maps[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(maps[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');

    const loc1 = screen.getByText(/kanto viridian/i);
    const loc2 = screen.getByText(/kanto power plant/i);

    expect(loc1).toBeInTheDocument();
    expect(loc2).toBeInTheDocument();
  });

  it('Usuário pode favoritar um pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /more details/i });
    expect(link).toBeInTheDocument();

    userEvent.click(link);

    const favoriteCheck = screen.getByLabelText(/pokémon favoritado/i);
    expect(favoriteCheck).toBeInTheDocument();

    userEvent.click(favoriteCheck);

    const starImg = screen.getByRole('img', { name: /is marked as favorite/i });
    expect(starImg).toBeInTheDocument();

    userEvent.click(favoriteCheck);

    expect(starImg).not.toBeInTheDocument();
  });
});
