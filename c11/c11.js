import { readFile } from "node:fs";
import { createInterface } from "node:readline";

readFile("data.json", function (err, data) {
  if (err) throw err;
  let i = 0;

  const tebakKata = JSON.parse(data);

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Tebakan: ",
  });

  console.log(`Pertanyaan: ${tebakKata[i].definition}`);
  rl.prompt();

  rl.on("line", (line) => {
    let input = line.trim();

    if (input.toLowerCase() === tebakKata[i].term.toLowerCase()) {
      console.log("Anda Benar!");
      i++;
      if (i < tebakKata.length) {
        console.log(`Pertanyaan: ${tebakKata[i].definition}`);
      }
    } else {
      console.log("Anda Salah!");
    }

    if (i >= tebakKata.length) {
      console.log("Anda Sudah Menyelesaikan!");
      rl.close();
      return;
    }
    rl.prompt();
  }).on("close", () => {
    console.log("Selamat tinggal!");
    process.exit(0);
  });
});
