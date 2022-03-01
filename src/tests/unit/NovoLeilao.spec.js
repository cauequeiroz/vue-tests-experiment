import { fireEvent, render, screen } from '@testing-library/vue';
import '@testing-library/jest-dom';
import { createLeilao } from "@/http";
import NovoLeilao from '@/views/NovoLeilao.vue';

jest.mock('@/http');
const $router = { push: jest.fn() };

describe('Um novo leilão', () => {
  test('deve enviar para a API o leilão cadastrado', async () => {
    createLeilao.mockResolvedValueOnce();

    render(NovoLeilao, { mocks: { $router } });

    await fireEvent.update(screen.getByLabelText('Objeto do leilão'), 'Teclado HyperX');
    await fireEvent.update(screen.getByLabelText('Descrição'), 'Um teclado mecanico profissional.');
    await fireEvent.update(screen.getByLabelText('Lance inicial'), 399);
    await fireEvent.click(screen.getByText('Criar'));

    expect(createLeilao).toHaveBeenCalled();
  });
});
