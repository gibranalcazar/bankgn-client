import { render, screen } from '@testing-library/react';
import {render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test("user-events allow users to login...", () =>{
  const {getByText, getByPlaceholderText} = render(<App/>);

  const button1 = getByText("Login");
  const input1 = getByPlaceholderText('Enter email');
  const button2 = getBy("Login");

  const input = getByPlaceholderText('Add Todo...');
  const button = getByText("Add #1");

  userEvent.click(button1);
  userEvent.type(input1, "paty@xmail.com");

  userEvent.type(input, "Learn spanish");
  userEvent.click(button);

  getByText('Learn spanish');
  getByText('Add #2');
})