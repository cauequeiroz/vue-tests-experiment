import { render, screen } from '@testing-library/vue';
import '@testing-library/jest-dom';
import Leilao from '@/components/Leilao.vue';

const leilao = {
  "produto": "Video Game",
  "descricao": "Um video game bem bacana, com vários jogos exclusivos.",
  "lanceInicial": 1000
};

describe('um item do leilão', () => {
  test('deve exibir as informações corretas', () => {
    render(Leilao, {
      props: { leilao }
    });

    expect(screen.getByText(leilao.produto)).toBeInTheDocument();
    expect(screen.getByText(leilao.descricao)).toBeInTheDocument();
    expect(screen.getByText(`R$ ${leilao.lanceInicial}`)).toBeInTheDocument();
  });
});
