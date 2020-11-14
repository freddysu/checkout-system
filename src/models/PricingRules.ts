import products, { ProductID } from './Products';

export type PricingRule = {
  customer: string;
  getPrice: (productId: ProductID, numOfProducts: number) => number;
}

const defaultRule: PricingRule = {
  customer: 'default',
  getPrice: (productId: ProductID, numOfProducts: number) => {
    return numOfProducts * products[productId].price;
  }
};

const specialRules: PricingRule[] = [
  {
    customer: 'SecondBite',
    getPrice: (productId: ProductID, numOfProducts: number) => {
      switch (productId) {
        // 3 for 2​ deal on ​Classic Ads
        case ProductID.CLASSIC:
          return n4mDeal(3, 2, numOfProducts) * products[productId].price;
        default:
          return numOfProducts * products[productId].price;
      }
    }
  },
  {
    customer: 'Axil Coffee Roasters',
    getPrice: (productId: ProductID, numOfProducts: number) => {
      switch (productId) {
        // Discount on ​Stand out Ads​
        case ProductID.STAND_OUT:
          return numOfProducts * 299.99;
        default:
          return numOfProducts * products[productId].price;
      }
    }
  },
  {
    customer: 'MYER',
    getPrice: (productId: ProductID, numOfProducts: number) => {
      switch (productId) {
        // 5​ for 4​ deal on ​Stand out Ads
        case ProductID.STAND_OUT:
          return n4mDeal(5, 4, numOfProducts) * products[productId].price;

        // Discount on ​Stand out Ads​
        case ProductID.PREMIUM:
          return numOfProducts * 389.99;
        default:
          return numOfProducts * products[productId].price;
      }
    }
  }
];

const pricingRules: PricingRule[] = [
  defaultRule,
  ...specialRules
];

function n4mDeal(n: number, m: number, numOfItems: number) {
  return (Math.floor(numOfItems / n) * m) + (numOfItems % n);
}

export default pricingRules;
