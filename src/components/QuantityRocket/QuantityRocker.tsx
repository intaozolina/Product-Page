import React, { FC, useState } from 'react';
import Plus from '../InfoBox/CE39824E-3B5F-4E86-A936-4C0E8247F4C3.png';
import Minus from '../InfoBox/3C91D364-A068-41BD-AEA5-8A01C1774BF8.png';
import './quantityRocker.scss';

type QuantityRockerProps = {
  clickHandler: (value: number) => void
}

const QuantityRocker = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <div className="product__buttons">
      <button
        className="product__decrease-btn"
        disabled={count === 0}
        onClick={() => { setCount(count - 1); }}
      >
        <img src={Minus} alt="minus" />
      </button>
      <input
        className="product__qty"
        type="number"
        value={count < 0 ? 0 : count}
        onChange={(e) => { setCount(Number(e.target.value)); }}
      />
      <button
        className="product__increase-btn"
        disabled={count === 50}
        onClick={() => { setCount(count + 1); }}
      >
        <img src={Plus} alt="plus" />
      </button>
    </div>
  );
};

export default QuantityRocker;
