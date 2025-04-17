function weirdMultiply(sentence) {
  let result = 1;
  if (sentence < 10) {
    return sentence;
  } else {
    for (let digit of sentence.toString()) {
      result = result * digit;
    }
  }
  return weirdMultiply(result);
}

console.log(weirdMultiply(39));
console.log(weirdMultiply(999));
console.log(weirdMultiply(3));
