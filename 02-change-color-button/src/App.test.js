import { logRoles, render, screen, fireEvent } from '@testing-library/react';
// import { logRoles } from '@testing-library/dom';
import App from './App';
import { replaceCamelWithSpaces } from './App';

test('button has correct initial color and update when clicked', () => {
  // const { container } = render(<App />);
  // logRoles(container);

  render(<App />);
  const colorButton = screen.getByRole('button', { name: 'Change to blue' });
  expect(colorButton).toHaveStyle({ backgroundColor: 'red' });
});

test('button turns blue when clicked', () => {
  render(<App />);
  const colorButton = screen.getByRole('button', { name: 'Change to blue' });
  expect(colorButton).toHaveStyle({ backgroundColor: 'red' });

  // click button
  fireEvent.click(colorButton);

  expect(colorButton).toHaveStyle({ backgroundColor: 'blue' });

  // text
  expect(colorButton).toHaveTextContent('Change to red');
});

test('initial conditions', () => {
  render(<App />);

  // 버튼 초기 활성화 확인
  const colorButton = screen.getByRole('button', { name: 'Change to blue' });
  expect(colorButton).toBeEnabled();

  // checkbox가 unchecked된 지 확인
  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).not.toBeChecked();
});

test('button disables when change checkbox', () => {
  render(<App />);
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });
  const colorButton = screen.getByRole('button', { name: 'Change to blue' });

  fireEvent.click(checkbox);
  expect(colorButton).toBeDisabled();

  fireEvent.click(checkbox);
  expect(colorButton).toBeEnabled();
});

/** */
test('button is gray when disabled button', () => {
  render(<App />);
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });
  const colorButton = screen.getByRole('button', { name: 'Change to blue' });

  //  disable button
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle('background-color: gray');

  // re-enable button
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle('background-color: red');
});

/** */
test('Clicked disabled button has gray background and reverts to blue', () => {
  render(<App />);
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });
  const colorButton = screen.getByRole('button', { name: 'Change to blue' });

  //  change button to blue
  fireEvent.click(colorButton);

  // disable button
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle('background-color: gray');

  // re-enable button
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle('background-color: blue');
});

/** */
describe('spaces before camel-case capital letters', () => {
  test('Works for no inner capital letters', () => {
    expect(replaceCamelWithSpaces('Red')).toBe('Red');
  });

  test('Works for one inner capital letter', () => {
    expect(replaceCamelWithSpaces('MidnightBlue')).toBe('Midnight Blue');
  });

  test('Works for multiple inner capital letter', () => {
    expect(replaceCamelWithSpaces('MediumVioletRed')).toBe('Medium Violet Red');
  });
});
