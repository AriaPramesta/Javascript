function deretKaskus(n) {
  const result = [];
  for (let i = 1; i <= n; i++) {
    const afterMath = i * 3;

    if (afterMath % 5 == 0 && afterMath % 6 == 0) {
      result.push("KASKUS");
    } else if (afterMath % 5 == 0) {
      result.push("KAS");
    } else if (afterMath % 6 == 0) {
      result.push("KUS");
    } else {
      result.push(afterMath);
    }
  }

  return result;
}

console.log(deretKaskus(10));
