import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('4. Teste o componente <NotFound.js />', () => {
  it('Página contém um heading h2 com o texto Page requested not found', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/naoExiste');

    const notFoundText = screen.getByRole('heading', { name: /not found/i, level: 2 });

    expect(notFoundText).toBeInTheDocument();
  });

  it('Página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/naoExiste');

    const img = screen.getByRole('img', { name: /pikachu crying/i });

    expect(img).toBeInTheDocument();
    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
