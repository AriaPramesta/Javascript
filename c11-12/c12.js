import { readFile } from "node:fs";
import { createInterface } from "node:readline";

let soal = process.argv[2];
if (!soal) {
  console.log("Soal harus di isi!");
  process.exit(1);
}

readFile(soal, function (err, data) {
  if (err) throw err;
  let i = 0;
  let salah = 1;

  const tebakKata = JSON.parse(data);

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Jawaban: ",
  });

  console.log(`Pertanyaan: ${tebakKata[i].definition}`);
  rl.prompt();

  rl.on("line", (line) => {
    let input = line.trim();

    if (input.toLowerCase() === tebakKata[i].term.toLowerCase()) {
      console.log("Anda Benar!");
      i++;
      salah = 1;
      if (i < tebakKata.length) {
        console.log(`Pertanyaan: ${tebakKata[i].definition}`);
      }
    } else if (input.toLowerCase() == "skip") {
      tebakKata.push(tebakKata[i]);
      i++;
      salah = 1;
      if (i < tebakKata.length) {
        console.log(`Pertanyaan: ${tebakKata[i].definition}`);
      }
    } else {
      console.log(`Anda Kurang beruntung! anda salah sebanyak ${salah} kali!`);
      salah++;
    }

    if (i >= tebakKata.length) {
      console.log("Anda Sudah Menyelesaikan!");
      rl.close();
      return;
    }
    rl.prompt();
  });
});
