import { render, screen, fireEvent } from '@testing-library/vue';
import '@testing-library/jest-dom';
import Lance from '@/components/Lance.vue';

describe('um lance sem valor mínimo', () => {
  test("não deve aceitar lances menores que zero", async () => {
    render(Lance);

    await fireEvent.update(screen.getByRole('valor'), -1);
    await fireEvent.click(screen.getByText('Dar lance!'));

    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  test("deve emitir o lance caso seja maior que zero", async () => {
    const { emitted } = render(Lance);

    await fireEvent.update(screen.getByRole('valor'), 29);
    await fireEvent.click(screen.getByText('Dar lance!'));

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(emitted()['novo-lance']).toBeTruthy();
    expect(emitted()['novo-lance'][0][0]).toBe('29');
  });
});

describe('um lance com valor mínimo', () => {
  test('não deve aceitar lances menores que o valor mínimo', async () => {
    render(Lance, { props: {
      lanceMinimo: 100
    }});

    await fireEvent.update(screen.getByRole('valor'), 50);
    await fireEvent.click(screen.getByText('Dar lance!'));

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByRole('alert').textContent).toContain('R$ 100');
  });

  test('deve emitir o lance caso o valor seja maior que o valor mínimo', async () => {
    const { emitted } = render(Lance, { props: {
      lanceMinimo: 100
    }});

    await fireEvent.update(screen.getByRole('valor'), 150);
    await fireEvent.click(screen.getByText('Dar lance!'));

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(emitted()['novo-lance']).toBeTruthy();
    expect(emitted()['novo-lance'][0][0]).toBe('150');
  });
});
