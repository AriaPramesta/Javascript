function pola(str) {
  for (let a = 0; a < 10; a++) {
    for (let b = 0; b < 10; b++) {
      let [math, result] = str.split(" = ");
      let [num1, num2] = math.split(" * ");

      let missingNum = num1.replace("#", a);
      let missingRight = result.replace("#", b);

      if (parseInt(missingNum) * parseInt(num2) === parseInt(missingRight)) {
        return [a, b];
      }
    }
  }
}

console.log(pola("42#3 * 188 = 80#204")); // expected output = [8, 5]
console.log(pola("8#61 * 895 = 78410#5")); // expected output = [7, 9]
