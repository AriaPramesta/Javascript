import { createInterface } from "readline";
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "tulis kalimatmu di sini > ",
});

function readLine(sentence) {
  let vocalLetter = ["a", "i", "u", "e", "o"];
  let toArray = sentence.split(" ");
  let result = [];

  for (let i = 0; i < toArray.length; i++) {
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

rl.prompt();

rl.on("line", (line) => {
  switch (line.trim().toLowerCase()) {
    default:
      const transformed = readLine(line.trim().toLowerCase());
      console.log(`hasil konversi: ${transformed}`);
      break;
  }

  rl.prompt();
}).on("close", () => {
  console.log("Good bye!");
  process.exit(0);
});
