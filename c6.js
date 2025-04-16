function sentenceManipulation(sentence) {
  let vocalLetter = ["a", "i", "u", "e", "o"];
  let toArray = sentence.split(" ");
  let result = [];

  for (let i = 0; i < vocalLetter.length; i++) {
    let word = toArray[i];
    let firstLetter = word.charAt(0);

    if (vocalLetter.includes(firstLetter)) {
      result.push(word);
    } else {
      result.push(word.slice(1) + firstLetter + "nyo");
    }
  }

  return result.join(" ");
}

console.log(sentenceManipulation("ibu pergi ke pasar bersama aku")); // output = ibu ergipnyo eknyo asarpnyo ersamabnyo aku
