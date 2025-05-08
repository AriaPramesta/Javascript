const PI = 22 / 7;

class Calculator {
  constructor() {
    this.x = 1;
  }

  add(value) {
    this.x += value;
    return this;
  }

  subtract(value) {
    this.x -= value;
    return this;
  }

  multiply(value) {
    this.x *= value;
    return this;
  }

  divide(value) {
    this.x /= value;
    return this;
  }

  square() {
    this.x *= this.x;
    return this;
  }

  squareRoot() {
    this.x = Math.sqrt(this.x);
    return this;
  }

  exponent(value) {
    this.x = this.x ** value;
    return this;
  }

  result() {
    return this;
  }
}

export { Calculator, PI };
