import { render, screen, fireEvent } from "@testing-library/vue";
import "@testing-library/jest-dom";
import Leiloeiro from "@/views/Leiloeiro.vue";
import { getLances, getLeilao } from "@/http";
import flushPromises from 'flush-promises';

jest.mock('@/http');

const leilao = {
  id: 1,
  produto: "Video Game",
  descricao: "Um video game bem bacana, com vários jogos exclusivos.",
  lanceInicial: 1000
};

const lances = [
  {
    id: 1,
    valor: 1001,
    data: "2020-06-13T18:04:26.826Z",
    leilao_id: 1
  },
  {
    valor: 1005,
    data: "2020-06-13T18:04:26.826Z",
    leilao_id: 1,
    id: 2
  },
  {
    valor: 1099,
    data: "2020-06-13T18:19:44.871Z",
    leilao_id: 1,
    id: 3
  }
];

const mockLeiloeiro = withLances => {
  getLeilao.mockResolvedValueOnce(leilao);
  getLances.mockResolvedValueOnce(withLances ? lances : []);

  render(Leiloeiro, { props: {
    id: 1
  }});

  return flushPromises();
}

describe("um leiloeiro", () => {
  test("deve exibir as informações do leilão", async () => {
    await mockLeiloeiro(false);

    expect(screen.getByText(leilao.produto)).toBeInTheDocument();
    expect(screen.getByText(leilao.descricao)).toBeInTheDocument();
    expect(screen.getByText(`R$ ${leilao.lanceInicial}`)).toBeInTheDocument();
  });
});

describe("um leiloeiro que não possue lances", () => {
  test("deve exibir a mensagem de que não possui lances", async () => {
    await mockLeiloeiro(false);

    expect(screen.getByRole('alert')).toBeInTheDocument();
  });
});

describe("um leiloeiro que possue lances", () => {
  test("não deve exibir a mensagem de que não possui lances", async () => {
    await mockLeiloeiro(true);

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  test("deve exibir a lista de lances", async () => {
    await mockLeiloeiro(true);

    expect(screen.getAllByRole('lance')).toHaveLength(3);
  });

  test("deve exibir o valor do maior lance", async () => {
    await mockLeiloeiro(true);

    expect(screen.getByRole('maior-lance').textContent).toContain(1099);
  });

  test("deve exibir o valor do menor lance", async () => {
    await mockLeiloeiro(true);

    expect(screen.getByRole('menor-lance').textContent).toContain(1001);
  });

  test("deve conseguir adicionar um novo lance", async () => {
    await mockLeiloeiro(true);

    await fireEvent.update(screen.getByRole('valor'), 1500);
    await fireEvent.click(screen.getByText('Dar lance!'));

    expect(screen.getAllByRole('lance')).toHaveLength(4);
    expect(screen.getAllByRole('lance')[3].textContent).toContain(1500);
  });
});
