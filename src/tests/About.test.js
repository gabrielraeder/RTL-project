import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import About from '../pages/About';

describe('2. Teste o componente <About.js />', () => {
  it('Teste se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const header = screen.getByRole('heading', { name: /about pokédex/i, level: 2 });
    expect(header).toBeInTheDocument();

    const p1 = screen.getByText(/this application simulates a Pokédex/i);
    expect(p1).toBeInTheDocument();

    const p2 = screen.getByText(/One can filter Pokémons by type/i);
    expect(p2).toBeInTheDocument();
  });

  it('Teste se a imagem da Pokédex está na página', () => {
    renderWithRouter(<About />);

    const img = screen.getByRole('img', { name: /pokédex/i });
    expect(img).toBeInTheDocument();

    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
