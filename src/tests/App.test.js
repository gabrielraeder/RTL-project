import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('1. Teste o componente <App.js />', () => {
  it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();
    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).toBeInTheDocument();
    const favsLink = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(favsLink).toBeInTheDocument();
  });

  it('Teste se a aplicação é redirecionada para a página inicial, link Home', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();

    userEvent.click(homeLink);

    expect(history.location.pathname).toBe('/');
  });

  it('Teste se a aplicação é redirecionada para a página ABOUT, link About', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).toBeInTheDocument();

    userEvent.click(aboutLink);

    expect(history.location.pathname).toBe('/about');
  });

  it('Teste se a aplicação é redirecionada para a página Favoritos', () => {
    const { history } = renderWithRouter(<App />);
    const favsLink = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(favsLink).toBeInTheDocument();

    userEvent.click(favsLink);

    expect(history.location.pathname).toBe('/favorites');
  });

  it('Teste se a aplicação é redirecionada para a página Not Found', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/naoExiste');

    const notFoundText = screen.getByRole('heading', { name: /not found/i, level: 2 });
    const img = screen.getByRole('img', { name: /pikachu crying/i });

    expect(notFoundText).toBeInTheDocument();
    expect(img).toBeInTheDocument();
  });
});
