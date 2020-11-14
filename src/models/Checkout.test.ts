import { Checkout } from './Checkout';
import { PricingRule } from './PricingRules';
import products, { ProductID } from './Products';

const rules: PricingRule[] = [
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
  }
];
const checkout = new Checkout(rules);

test('Empty items at the begining', () => {
  expect(checkout.items.length).toEqual(0);
});

test('Add a new item', () => {
  checkout.add(ProductID.CLASSIC);
  expect(checkout.items.length).toEqual(1);
});

test('Remove an non existed item', () => {
  checkout.remove(ProductID.PREMIUM);
  expect(checkout.items.length).toEqual(1);
});

test('Remove an item', () => {
  checkout.remove(ProductID.CLASSIC);
  expect(checkout.items.length).toEqual(0);
});

test('Clear all items', () => {
  checkout.add(ProductID.CLASSIC);
  checkout.add(ProductID.STAND_OUT);
  checkout.add(ProductID.PREMIUM);
  checkout.clear();
  expect(checkout.items.length).toEqual(0);
})

test('Return the correct total', () => {
  checkout.add(ProductID.STAND_OUT);
  checkout.add(ProductID.STAND_OUT);
  checkout.add(ProductID.STAND_OUT);
  checkout.add(ProductID.PREMIUM);
  const total = checkout.total('Axil Coffee Roasters')
  expect(total).toEqual(1294.96);
});