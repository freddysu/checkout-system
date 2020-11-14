import { ProductID } from './Products';
import pricingRules, { PricingRule } from './PricingRules';

export class Checkout {

  items: ProductID[] = [];

  constructor(private pricingRules: PricingRule[]) {}

  add(item: ProductID) {
    this.items.push(item);
  }

  remove(item: ProductID) {
    const idx = this.items.indexOf(item);
    if (idx !== -1) {
      this.items.splice(idx, 1);
    }
  }

  clear() {
    this.items = [];
  }

  total(customer: string = 'default') {
    const getPrice = (
      this.pricingRules.find(rule => rule.customer === customer)?.getPrice ||
      this.pricingRules.find(rule => rule.customer === 'default')!.getPrice
    );
    const numOfClassicAd = this.items.filter(item => item === ProductID.CLASSIC).length;
    const numOfStandOutAd = this.items.filter(item => item === ProductID.STAND_OUT).length;
    const numOfPremiumAd = this.items.filter(item => item === ProductID.PREMIUM).length;
    return (
      getPrice(ProductID.CLASSIC, numOfClassicAd) +
      getPrice(ProductID.STAND_OUT, numOfStandOutAd) +
      getPrice(ProductID.PREMIUM, numOfPremiumAd)
    );
  }
}

export default new Checkout(pricingRules);
