import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SummaryForm from '../SummaryForm';

test('initial conditions', () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });
  expect(checkbox).not.toBeChecked();

  const confirmButton = screen.getByRole('button', { name: /confirm order/i });
  expect(confirmButton).toBeDisabled();
});

test('Checkbox disabled button on first click and enables on second click', async () => {
  const user = userEvent.setup();

  render(<SummaryForm />);
  const checkbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });
  const confirmButton = screen.getByRole('button', { name: /confirm order/i });

  await user.click(checkbox);
  expect(confirmButton).toBeEnabled();

  await user.click(checkbox);
  expect(confirmButton).toBeDisabled();
});

test('popover responds to hover', async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);

  // 처음에는 hidden
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();

  // mouseover하면 appears
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  await user.hover(termsAndConditions);
  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  // mouse out 하면 disappears
  await user.unhover(termsAndConditions);
  expect(popover).not.toBeInTheDocument();
});
