import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('5. Teste o componente <Pokedex.js />', () => {
  it('Página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const heading = screen.getByRole('heading', { name: /Encountered pokémons/i });
    expect(heading).toBeInTheDocument();
  });

  it(' exibido o próximo pokémon da lista quando botão Próximo pokémon é clicado', () => {
    renderWithRouter(<App />);

    const allBtn = screen.getByRole('button', { name: /all/i });
    const pokemon = screen.getByText(/pikachu/i);
    expect(pokemon).toBeInTheDocument();

    const nextBtn = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(nextBtn).toBeInTheDocument();
    expect(allBtn).toBeInTheDocument();

    userEvent.click(nextBtn);

    const pokemon2 = screen.getByText(/charmander/i);
    expect(pokemon2).toBeInTheDocument();
    expect(allBtn).toBeInTheDocument();

    userEvent.click(nextBtn);

    const pokemon3 = screen.getByText(/caterpie/i);
    expect(pokemon3).toBeInTheDocument();
    expect(allBtn).toBeInTheDocument();
  });

  it('Testa se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const allBtn = screen.getByRole('button', { name: /all/i });
    const types = pokemons.map((poke) => poke.type);
    const filterTypes = [...new Set(types)];
    const typeBtns = screen.getAllByTestId('pokemon-type-button');

    expect(typeBtns.length).toEqual(filterTypes.length);
    typeBtns.forEach((btn) => {
      expect(filterTypes).toContain(btn.textContent);
    });
    expect(allBtn).toBeInTheDocument();
  });

  it('O texto do botão deve corresponder ao nome do tipo, ex. Fire', () => {
    renderWithRouter(<App />);
    const fireBtn = screen.getByRole('button', { name: /fire/i });
    const allBtn = screen.getByRole('button', { name: /all/i });
    expect(fireBtn).toBeInTheDocument();
    expect(allBtn).toBeInTheDocument();

    userEvent.click(fireBtn);

    const pokeName = screen.getByTestId('pokemon-name');
    const pokeType = screen.getByTestId('pokemon-type');

    expect(pokeName.textContent).toBe('Charmander');
    expect(pokeType.textContent).toBe('Fire');
    expect(allBtn).toBeInTheDocument();
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const fireBtn = screen.getByRole('button', { name: /fire/i });
    const allBtn = screen.getByRole('button', { name: /all/i });
    expect(fireBtn).toBeInTheDocument();
    expect(allBtn).toBeInTheDocument();

    userEvent.click(fireBtn);
    expect(allBtn).toBeInTheDocument();

    userEvent.click(allBtn);

    const pokeName = screen.getByTestId('pokemon-name');
    const pokeType = screen.getByTestId('pokemon-type');

    expect(pokeName.textContent).toBe('Pikachu');
    expect(pokeType.textContent).toBe('Electric');
  });
});
