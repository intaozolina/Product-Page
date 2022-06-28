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

type ProductOptions = {
  // @ts-ignore
  '1080p': ProductOption,
  // @ts-ignore
  '4K': ProductOption,
  battery_accessories: ProductOption,

}

type ProductOption = {
  label: string,
  price: ProductOptionPrice,
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
  end_date: string,
}

type ProductGallery = {
  main: string,
}

type ProductShipping = {
  method: ProductShippingMethod,
  lead_time: ProductShippingMethodTime,
  props: ProductShippingProps,
}

type ProductShippingMethod = {
  country: string,
  title: string,
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
  ready_to_ship: boolean,
  in_stock: boolean,
  fast_dispatch: boolean,
}

type ProductReviews = {
  rating: string,
  count: number,
  total_buyers: number,
}
