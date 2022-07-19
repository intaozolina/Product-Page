export type ProductData = {
  success: number,
  product: Product,
}

export type Product = {
  name: string,
  tags: string [],
  options: ProductOptions,
  discount: ProductDiscount,
  gallery: ProductGallery [],
  shipping: ProductShipping,
  reviews: ProductReviews
}

export type ProductOptions = {
  // @ts-ignore
  '1080p': ProductOption,
  // @ts-ignore
  '4K': ProductOption,
  // eslint-disable-next-line camelcase
  battery_accessories: ProductOption,

}

export type ProductOption = {
  label: string,
  price: ProductOptionPrice,
  // eslint-disable-next-line camelcase
  old_price: ProductOptionPrice,
}

type ProductOptionPrice = {
  value: number,
  currency: ProductOptionPriceCurrency
}

type ProductOptionPriceCurrency = {
  code: string,
  symbol: string,
  format: string,
}

type ProductDiscount = {
  amount: string,
  // eslint-disable-next-line camelcase
  end_date: string,
}

type ProductGallery = {
  main: string,
}

type ProductShipping = {
  method: ProductShippingMethod,
  // eslint-disable-next-line camelcase
  lead_time: ProductShippingMethodTime,
  props: ProductShippingProps,
}

type ProductShippingMethod = {
  country: string,
  title: string,
  // eslint-disable-next-line camelcase
  shipping_time: ProductShippingMethodTime,
  cost: ProductShippingMethodCost,

}

type ProductShippingMethodTime = {
  value: string,
  info: string,
}

type ProductShippingMethodCost = {
  value: number,
  currency: ProductOptionPriceCurrency
}

type ProductShippingProps = {
  // eslint-disable-next-line camelcase
  ready_to_ship: boolean,
  // eslint-disable-next-line camelcase
  in_stock: boolean,
  // eslint-disable-next-line camelcase
  fast_dispatch: boolean,
}

type ProductReviews = {
  rating: string,
  count: number,
  // eslint-disable-next-line camelcase
  total_buyers: number,
}
