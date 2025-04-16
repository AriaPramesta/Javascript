function stringManipulation(word) {
  let firstLetter = word.charAt(0);
  let vocalLetter = ["a", "i", "u", "e", "o"];

  if (vocalLetter.includes(firstLetter)) {
    return word;
  } else {
    return word.slice(1) + firstLetter + "nyo";
  }
}

console.log(stringManipulation("ayam"));
console.log(stringManipulation("bebek"));
