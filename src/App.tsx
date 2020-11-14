import React, { useState, useEffect } from 'react';
import './App.css';
import { ProductID } from './models/Products';
import checkout from './models/Checkout';

const customerList = [
  'default',
  'SecondBite',
  'Axil Coffee Roasters',
  'MYER'
];

function App() {
  const [customer, setCustomer] = useState('default');
  const [items, setItems] = useState(checkout.items);
  const [total, setTotal] = useState(0);

  const onChangeCustomer = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    setCustomer(evt.currentTarget.value);
  }

  const onAddAd = (evt: React.MouseEvent<HTMLButtonElement>) => {
    const id = evt.currentTarget.id as ProductID;
    checkout.add(id);
    setItems([...checkout.items]);
  }

  const onRemoveAd = (evt: React.MouseEvent<HTMLButtonElement>) => {
    const id = evt.currentTarget.id as ProductID;
    checkout.remove(id);
    setItems([...checkout.items]);
  }

  useEffect(() => {
    checkout.clear();
    checkout.add(ProductID.CLASSIC);
    checkout.add(ProductID.STAND_OUT);
    checkout.add(ProductID.PREMIUM);
    setItems([...checkout.items]);
  }, [])
  
  useEffect(() => {
    setTotal(checkout.total(customer));
  }, [customer, items])

  return (
    <div className="App">
      <div className="content">
        <div className="row">Customer:
          <select value={customer} onChange={onChangeCustomer}>
            {customerList.map(item => <option key={item} value={item}>{item}</option>)}
          </select>
        </div>
        <div className="row">
          <label>Classic Ad:</label>
          <span className="value">
            {items.filter(item => item === ProductID.CLASSIC).length}
          </span>
          <button id={ProductID.CLASSIC} onClick={onAddAd}>+</button>
          <button id={ProductID.CLASSIC} onClick={onRemoveAd}>-</button>
        </div>
        <div className="row">
          <label>Stand out Ad:</label>
          <span className="value">
            {items.filter(item => item === ProductID.STAND_OUT).length}
          </span>
          <button id={ProductID.STAND_OUT} onClick={onAddAd}>+</button>
          <button id={ProductID.STAND_OUT} onClick={onRemoveAd}>-</button>
        </div>
        <div className="row">
          <label>Premium Ad:</label>
          <span className="value">
            {items.filter(item => item === ProductID.PREMIUM).length}
          </span>
          <button id={ProductID.PREMIUM} onClick={onAddAd}>+</button>
          <button id={ProductID.PREMIUM} onClick={onRemoveAd}>-</button>
        </div>
        <div className="row">Total: ${total.toFixed(2)}</div>
      </div>
    </div>
  );
}

export default App;
