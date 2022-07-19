import React, { FC } from 'react';
import Plus from '../InfoBox/CE39824E-3B5F-4E86-A936-4C0E8247F4C3.png';
import Minus from '../InfoBox/3C91D364-A068-41BD-AEA5-8A01C1774BF8.png';
import './quantityRocker.scss';

type QuantityRockerProps = {
  inputHandler: (value: number) => void
  incrementClickHandler: () => void
  decrementClickHandler: () => void
  count: number
  minValue: number
  maxValue: number
}

const QuantityRocker:FC<QuantityRockerProps> = ({
  count, incrementClickHandler, decrementClickHandler, inputHandler, minValue, maxValue,
}) => (

  <div className="product__buttons">
    <button
      className="product__decrease-btn"
      disabled={count === minValue}
      onClick={() => { decrementClickHandler(); }}
    >
      <img src={Minus} alt="minus" />
    </button>
    <input
      className="product__qty"
      type="number"
      value={count < minValue ? minValue : count}
      onChange={(e) => { inputHandler(Number(e.target.value)); }}
    />
    <button
      className="product__increase-btn"
      disabled={count === maxValue}
      onClick={() => { incrementClickHandler(); }}
    >
      <img src={Plus} alt="plus" />
    </button>
  </div>
);

export default QuantityRocker;
