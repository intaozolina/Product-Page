import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.scss';
import './components/InfoBox/infoBox.scss';
import './components/SummaryBox/summaryBox.scss';
import './components/QuantityRocket/quantityRocker.scss';
import ImageBox from './components/ImageBox/ImageBox';
import { Product, ProductOption } from './components/Data/module';
import Star from './components/InfoBox/4782FF90-406B-4FAB-A7C9-1956E1DB1136.png';
import CheckIcon from './components/InfoBox/2B288867-9DEB-4BA1-B6FB-682E9A5A114B.png';
import Logo from './components/InfoBox/Logo.png';
import Arrow from './components/InfoBox/C4AF9E23-7965-4A5A-B3F3-E5A7F3A0FC4D.png';
import Clock from './components/InfoBox/icons8-clock.png';
import IconTrade from './components/InfoBox/228E1B06-945F-43B3-9E48-FC5DB82AE615.svg';
import IconVisa from './components/InfoBox/280826B2-7262-474E-A0AF-ACE53F281466.svg';
import IconMastercard from './components/InfoBox/F719CDB9-B508-4A38-815C-ACC4C2CB571E.svg';
import IconApplePay from './components/InfoBox/43913126-CE8C-48FB-AEBD-1E93A858523C.svg';
import IconInfo from './components/SummaryBox/9E66FD8E-DFE9-4903-94CF-816870416415.png';
import IconMail from './components/SummaryBox/DE463F6E-D57D-4B9C-8F2A-76099E63085D.png';
import QuantityRocker from './components/QuantityRocket/QuantityRocker';

type CartProduct = {
  label:string,
  symbol: string,
  price: number,
  count: number,
}

const App = () => {
  const [productData, setProductData] = useState<Product>();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState<CartProduct[]>([]);

  const getProductData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://fe-assignment.vaimo.net');
      setProductData(response.data.product);
      setCart(Object.values(response.data.product.options)
        .map((option:any) => ({
          label: option.label,
          symbol: option.price.currency.symbol,
          price: option.price.value,
          count: 0,
        })));
    } catch (error: any) {
      setErrorMessage(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getProductData()
      .then();
  }, []);

  if (!productData) {
    return null;
  }

  const options = Object.values(productData.options);

  const shippingProps = Object.keys(productData.shipping.props)
    .map((prop) => prop
      .split('_')
      .map((word) => word.replace(word[0], word[0].toUpperCase()))
      .join(' '));

  const reviewRate = [...Array(Math.floor(parseFloat(productData.reviews.rating)))];

  const currencyCode = options.map((option) => option.price.currency.symbol);

  const currentPrices = () => {
    const prices: number[] = [];
    options.map((option) => prices.push(option.price.value));
    return prices.sort((a, b) => a - b);
  };

  const oldPrices = () => {
    const prices: number[] = [];
    options.map((option) => prices.push(option.old_price.value));
    return prices.sort((a, b) => a - b);
  };

  const timeLeft = () => {
    const distance = new Date(productData.discount.end_date).getTime() - new Date().getTime();
    const days = distance && Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = distance && Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = distance && Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = distance && Math.floor((distance % (1000 * 60)) / 1000);
    return `${days}d:${hours}h:${minutes}m:${seconds}s`;
  };

  const changeCount = (i: number, step: number) => {
    const newCart = [...cart];
    newCart[i].count = cart[i].count + step;
    return newCart;
  };

  const setCountValue = (i:number, value:number) => {
    const newCart = [...cart];
    newCart[i].count = value;
    return newCart;
  };

  return (
    <div className="hero">
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
              {reviewRate.map((star) => (
                <div key={Math.random()}>
                  <img src={Star} alt={star} />
                </div>
              ))}
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
          </div>

          <div className="row">
            <div className="infoBox__banner">
              <img className="banner__logo" src={Logo} alt="Logo" />
              <span className="banner__text-shipping">• Free shipping (up to $40)</span>
              <span className="banner__text-delivery">• On-time delivery guaranteed</span>
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
                {cart.map((option, index) => (
                  <div key={Math.random()} className="product__description">
                    <p className="product__label">{option.label}</p>
                    <p className="product__price">
                      {option.symbol}
                      {' '}
                      {option.price.toFixed(2)}
                    </p>
                    <QuantityRocker
                      count={option.count}
                      minValue={0}
                      maxValue={10}
                      incrementClickHandler={() => {
                        setCart(changeCount(index, 1));
                      }}
                      decrementClickHandler={() => {
                        setCart(changeCount(index, -1));
                      }}
                      inputHandler={(value) => {
                        setCart(setCountValue(index, value));
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="infoBox__footer">
              <img src={IconTrade} alt="Trade" />
              <span className="footer__heading">
                Trade Assurance
                {' '}
              </span>
              <span> protects your Alibaba.com orders</span>
            </div>
          </div>

          <div className="row">
            <div className="infoBox__footer">
              <span>Payments: </span>
              <img src={IconVisa} alt="Visa" />
              <img src={IconMastercard} alt="Mastercard" />
              <img src={IconApplePay} alt="ApplePay" />
            </div>
          </div>

          <div className="row">
            <div className="infoBox__footer">
              <span>Alibaba.com Logistics</span>
              <span className="footer__text">Inspection Solutions</span>
            </div>
          </div>
        </div>

        <div className="col-xs-12 col-md-3">
          <div className="summary">
            <div>
              {cart.map((product) => product.count > 0 && (
              <div key={Math.random()} className="summary__shipping-costs">
                <div className="shipping__method">
                  {product.label}
                  {' '}
                  x
                  {' '}
                  {product.count}
                </div>
                <div className="shipping__price">
                  {product.symbol}
                  {' '}
                  {(product.count * product.price).toFixed(2)}
                </div>
              </div>
              ))}
            </div>
            <div className="summary__shipping-costs">
              <div className="shipping__method">
                <span className="method__text">
                  Ship to
                  {' '}
                  {productData.shipping.method.country}
                  {' '}
                </span>
                by
                {' '}
                {productData.shipping.method.title}
              </div>
              <div className="shipping__price">
                {productData.shipping.method.cost.currency.symbol}
                {' '}
                {productData.shipping.method.cost.value.toFixed(2)}
              </div>
            </div>

            <div className="summary__shipping-time">
              <span>
                Lead time
                {' '}
                {productData.shipping.lead_time.value}
              </span>
              <img src={IconInfo} alt="Info" />
            </div>

            <div className="summary__shipping-time">
              <span>
                Shipping time
                {' '}
                {productData.shipping.method.shipping_time.value}
              </span>
              <img src={IconInfo} alt="Info" />
            </div>

            <button className="login-btn">Login to Purchase</button>
            <button className="contact-btn">
              <img src={IconMail} alt="Mail" />
              Contact the Supplier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default App;
