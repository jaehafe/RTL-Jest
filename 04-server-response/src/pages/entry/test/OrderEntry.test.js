import { render, screen, waitFor } from '@testing-library/react';
import OrderEntry from '../OrderEntry';
import { rest } from 'msw';
import { server } from '../../../mocks/server';

test.only('handles error for scoops and toppings routes', async () => {
  server.resetHandlers(
    rest.get('http://localhost:3030/scoops', (_, res, ctx) => {
      return res(ctx.status(500));
    }),

    rest.get('http://localhost:3030/toppings', (_, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  render(<OrderEntry />);

  waitFor(async () => {
    const alerts = await screen.findAllByRole('alert', {
      name: 'An unexpected error occurred. Please try again later.',
    });
    expect(alerts).toHaveLength(2);
  });
});

// skip
test.skip('no', () => {});
