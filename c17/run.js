import { Calculator, PI } from "./calculator.js";

const calc = new Calculator();

calc.add(10).subtract(5).result(); // 1 + 10 - 5 = 6
console.log(calc.x);

calc.add(3).multiply(4).divide(6).result(); // 6 + 3 * 4 / 6 = 6
console.log(calc.x);

calc.x = 7; // set jari-jari 7
console.log(`nilai sekarang : ${calc.x}`);

calc.multiply(2).multiply(PI).result(); // keliling lingkarang dengan jari-jari 7 => 2 x PI x r pangkat 2 = 44
console.log(calc.x);

calc.x = 7; // set jari-jari 7
console.log(`nilai sekarang : ${calc.x}`);

calc.square().multiply(PI).result(); // luas lingkaran dengan jari-jari 7 => PI x r pangkat 2 = 154
console.log(calc.x);

calc.x = 4;
console.log(`nilai sekarang : ${calc.x}`);

calc.exponent(3).result(); // 4 pangkat 3 = 64
console.log(calc.x);

calc.squareRoot().result(); // akar pangkat 2 dari 64 = 8
console.log(calc.x);
