import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import checkout from '../models/Checkout';

describe('App tests', () => {

  test('Add a Classic Ad', () => {
    render(<App checkout={checkout} />);
    const classicNumEn = screen.getByTestId('classic-number');
    const addBtn = screen.getByTestId('add-classic-btn');
    const num = +classicNumEn.innerHTML;
    fireEvent.click(addBtn);
    expect(+classicNumEn.innerHTML).toEqual(num + 1);
  });

  test('Remove a Classic Ad', () => {
    render(<App checkout={checkout} />);
    const classicNumEn = screen.getByTestId('classic-number');
    const removeBtn = screen.getByTestId('remove-classic-btn');
    const num = +classicNumEn.innerHTML;
    fireEvent.click(removeBtn);
    expect(+classicNumEn.innerHTML).toEqual(num - 1);
  });

  test('Render the total value', () => {
    render(<App checkout={checkout} />);
    const totalEn = screen.getByTestId('total');
    expect(totalEn).toBeInTheDocument();
  });

  test('Display the correct total', () => {
    render(<App checkout={checkout} />);
    const totalEn = screen.getByTestId('total');
    expect(+totalEn.innerHTML).toEqual(checkout.total());
  });

});
