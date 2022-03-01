import { render, screen } from "@testing-library/vue";
import "@testing-library/jest-dom";
import Avaliador from "@/views/Avaliador.vue";
import { getLeiloes } from "@/http";
import flushPromises from 'flush-promises';

jest.mock("@/http");

const leiloes = [
  {
    id: 1,
    produto: "Video Game",
    descricao: "Um video game bem bacana, com vários jogos exclusivos.",
    lanceInicial: 1000
  },
  {
    id: 2,
    produto: "Notebook",
    descricao: "Completinho, quase novo. A diversão é garantida!",
    lanceInicial: 500
  }
];

describe("Um avaliador com leiloes", () => {
  test("deve obter os leilões da API e exibir corretamente", async () => {
    getLeiloes.mockResolvedValueOnce(leiloes);

    render(Avaliador, {
      stubs: ["router-link"]
    });

    await flushPromises();

    expect(getLeiloes).toHaveBeenCalled();

    expect(screen.getByText(leiloes[0].produto)).toBeInTheDocument();
    expect(screen.getByText(leiloes[0].descricao)).toBeInTheDocument();
    expect(screen.getByText(`R$${leiloes[0].lanceInicial}`)).toBeInTheDocument();

    expect(screen.getByText(leiloes[1].produto)).toBeInTheDocument();
    expect(screen.getByText(leiloes[1].descricao)).toBeInTheDocument();
    expect(screen.getByText(`R$${leiloes[1].lanceInicial}`)).toBeInTheDocument();

    expect(screen.queryAllByText('Acessar leilão')).toHaveLength(2);
  });

  test('não deve exibir leilões caso API não retorne nada', async () => {
    getLeiloes.mockResolvedValueOnce([]);

    render(Avaliador, {
      stubs: ["router-link"]
    });

    await flushPromises();

    expect(screen.queryAllByText('Acessar leilão')).toHaveLength(0);
  });
});
