function isPrimeNumber(n) {
  for (let i = 2; i < n; i++) {
    if (n % i == 0) {
      return false;
    }
  }
  return true;
}

function indexPrime(param1) {
  let count = 0;
  let num = 2;

  while (true) {
    if (isPrimeNumber(num)) {
      count++;
      if (count === param1) {
        return num;
      }
    }
    num++;
  }
}

console.log(indexPrime(4)); // result = 7
console.log(indexPrime(500)); // result = 3571
console.log(indexPrime(37786)); // result = 450881
