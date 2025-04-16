function romawi(n) {
  const romawiMatrix = [
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];

  let hasil = "";

  for (let i = 0; i < romawiMatrix.length; i++) {
    while (n >= romawiMatrix[i][0]) {
      hasil = hasil + romawiMatrix[i][1];
      n = n - romawiMatrix[i][0];
    }
  }
  return hasil;
}

console.log("Input | expected | result");
console.log("-------------------------");
console.log("4     | IV       | ", romawi(4));
console.log("9     | IX       | ", romawi(9));
console.log("13    | XIII     | ", romawi(13));
console.log("1453  | MCDLIII  | ", romawi(1453));
console.log("1646  | MDCXLVI  | ", romawi(1646));
