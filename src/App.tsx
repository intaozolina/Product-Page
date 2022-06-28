import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.scss';
import './components/InfoBox/infoBox.scss';
import ImageBox from './components/ImageBox/ImageBox';
import { Product } from './components/Data/module';
import CheckIcon from './components/InfoBox/2B288867-9DEB-4BA1-B6FB-682E9A5A114B.png';
import Star from './components/InfoBox/4782FF90-406B-4FAB-A7C9-1956E1DB1136.png';
import Logo from './components/InfoBox/Logo.png';
import Arrow from './components/InfoBox/C4AF9E23-7965-4A5A-B3F3-E5A7F3A0FC4D.png';
import Clock from './components/InfoBox/icons8-clock.png';
import Plus from './components/InfoBox/CE39824E-3B5F-4E86-A936-4C0E8247F4C3.png';
import Minus from './components/InfoBox/3C91D364-A068-41BD-AEA5-8A01C1774BF8.png';

const App = () => {
  const [productData, setProductData] = useState<Product>();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const getProductData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://fe-assignment.vaimo.net/');
      setProductData(response.data.product);
    } catch (error:any) {
      setErrorMessage(error);
    } finally {
      setLoading(false);
    }
  };

  const shippingProps = productData && Object.keys(productData.shipping.props)
    .map((prop) => prop
      .split('_')
      .map((word) => word.replace(word[0], word[0].toUpperCase()))
      .join(' '));

  // const reviewRate = productData && Array(Number(productData.reviews.rating));
  const options = (productData) && Object.values(productData.options);
  const currencyCode = options?.map((option) => option.price.currency.symbol);

  const currentPrices = () => {
    const prices: number[] = [];
    if (options) { options.map((option) => prices.push(option.price.value)); }
    return prices.sort((a, b) => a - b);
  };
  const oldPrices = () => {
    const prices: number[] = [];
    if (options) { options.map((option) => prices.push(option.old_price.value)); }
    return prices.sort((a, b) => a - b);
  };

  const timeLeft = () => {
    const distance = productData && new Date(productData.discount.end_date).getTime() - new Date().getTime();
    const days = distance && Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = distance && Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = distance && Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = distance && Math.floor((distance % (1000 * 60)) / 1000);
    return `${days}d:${hours}h:${minutes}m:${seconds}s`;
  };

  useEffect(() => {
    getProductData().then();
  }, []);

  return (
    <div className="hero">

      {productData && (
      <div className="row center-xs">
        <div className="col-xs-12 col-md-4">
          <ImageBox imageSrc={productData.gallery[0].main} />
        </div>
        <div className="col-xs-12 col-md-5">

          {shippingProps
            && (
            <div className="row">
              <div className="infoBox__shipProps">{shippingProps[0]}</div>
              <div className="infoBox__shipProps-icon">
                <img className="shipProps__icon" src={CheckIcon} alt={shippingProps[1]} />
                {shippingProps[1]}
              </div>
              <div className="infoBox__shipProps-icon">
                <img className="shipProps__icon" src={CheckIcon} alt={shippingProps[1]} />
                {shippingProps[2]}
              </div>
            </div>
            )}

          <div className="row">
            <div className="infoBox__product-name">
              <span>{productData.name}</span>
              {productData.tags.map((tag) => (
                <div
                  className="infoBox__tag"
                  key={Math.random()}
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>

          <div className="row">
            <div className="infoBox__review">
              {/* {reviewRate && reviewRate.map((star) => ( */}
              {/*   <div key={Math.random()}> */}
              {/*     <img src={Star} alt={star} /> */}
              {/*   </div> */}
              {/* ))} */}
              <span className="review__rating">{productData.reviews.rating}</span>
              <span className="review__count">
                {productData.reviews.count}
                {' '}
                Reviews
              </span>
              <span>
                {productData.reviews.total_buyers}
                {' '}
                buyers
              </span>
            </div>
          </div>

          <div className="row">
            {currencyCode && (
              <div className="infoBox__price">
                <span className="price__currentValue">
                  {currencyCode[0]}
                  {' '}
                  {currentPrices()[0]}
                  {' '}
                  -
                  {' '}
                  {currencyCode[currencyCode.length - 1]}
                  {' '}
                  {currentPrices()[currentPrices().length - 1]}
                </span>
                <span className="price__options">/ Option</span>
                <span className="price__separator">|</span>
                <span>2 Options </span>
                <span className="price__options">(Min.Order)</span>
                <p className="price__oldValue">
                  {currencyCode[0]}
                  {' '}
                  {oldPrices()[0]}
                  {' '}
                  -
                  {' '}
                  {currencyCode[currencyCode.length - 1]}
                  {' '}
                  {oldPrices()[oldPrices().length - 1]}
                </p>
              </div>
            )}
          </div>

          <div className="row">
            <div className="infoBox__banner">
              <img className="banner__logo" src={Logo} alt="Logo" />
              <span className="banner__text">• Free shipping (up to $40)</span>
              <span className="banner__text">• On-time delivery guaranteed</span>
              <img className="banner_arrow" src={Arrow} alt="Arrow" />
            </div>
          </div>

          <div className="row">
            <div className="infoBox__discount">
              <span className="discount__amount">
                {productData.discount.amount}
                {' '}
                OFF
              </span>
              <span className="discount__label">
                Discount ends in
              </span>
              <img className="discount__image" src={Clock} alt="Clock" />
              <span className="discount__endDate">
                {timeLeft()}
              </span>
            </div>
          </div>

          <div className="row">
            <div className="infoBox__options">
              <div className="options__heading">Options:</div>
              <div className="options__products">
                {options && options.map((option) => (
                  <div className="product__description">
                    <span>{option.label}</span>
                    <span>
                      {option.price.currency.symbol}
                      {' '}
                      {option.price.value}
                    </span>
                    <div className="product__buttons">
                      <button className="product__decrease-btn">
                        <img src={Minus} alt="minus" />
                      </button>
                      <input className="product__qty" type="number" value="0" />
                      <button className="product__increase-btn">
                        <img src={Plus} alt="plus" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
      )}
    </div>
  );
};
export default App;
