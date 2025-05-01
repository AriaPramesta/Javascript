import { readFileSync, writeFileSync } from "node:fs";

const command = process.argv[2];
let taskId = parseInt(process.argv[3]) - 1;

const data = JSON.parse(
  readFileSync("c13.json", { encoding: "utf8", flag: "r" })
);

switch (command) {
  case "add":
    let todo = process.argv.slice(3).join(" ");
    if (!todo) {
      console.log("Mohon ketik sesuatu!");
    } else {
      let newTodo = { title: todo, isComplete: false, tags: [] };
      data.push(newTodo);
      writeFileSync("c13.json", JSON.stringify(data, null, 2));
      console.log(`"${todo}" berhasil disimpan!`);
    }
    break;

  case "complete":
    if (isNaN(taskId) || taskId < 0 || taskId >= data.length) {
      console.log(
        "Gunakan angka sesuai urutan untuk merubah todo yang anda mau!"
      );
    } else {
      if (!data[taskId].isComplete) {
        data[taskId].isComplete = true;
        writeFileSync("c13.json", JSON.stringify(data, null, 2));
        console.log(`${data[taskId].title} telah diselesaikan!`);
      } else {
        console.log("Status tugas sudah selesai sebelumnya!");
      }
    }
    break;

  case "uncomplete":
    if (isNaN(taskId) || taskId < 0 || taskId >= data.length) {
      console.log(
        "Gunakan angka sesuai urutan untuk merubah todo yang anda mau!"
      );
    } else {
      if (data[taskId].isComplete) {
        data[taskId].isComplete = false;
        writeFileSync("c13.json", JSON.stringify(data, null, 2));
        console.log(`status "${data[taskId].title}" telah dibatalkan!`);
      } else {
        console.log("Status tugas belum selesai sebelumnya!");
      }
    }
    break;

  case "delete":
    if (isNaN(taskId) || taskId < 0 || taskId >= data.length) {
      console.log(
        "Todo yang ingin anda dihapus tidak ada, atau nilai yang anda masukan tidak valid!"
      );
    } else {
      let newTodos = data.splice(taskId, 1)[0];
      writeFileSync("c13.json", JSON.stringify(data, null, 2));
      console.log(`"${newTodos.title}" berhasil dihapus!`);
    }
    break;

  case "task":
    if (isNaN(taskId) || taskId < 0 || taskId >= data.length) {
      console.log("Task tidak tersedia!");
    } else {
      let task = data[taskId];
      console.log(`Detail task: ${taskId + 1}`);
      console.log(`Title: ${task.title}`);
      console.log(`Complete: ${task.isComplete ? "selesai" : "belum selesai"}`);
      console.log(`Tags: ${task.tags.join(", ") || "-"}`);
    }
    break;

  case "list":
    if (data.length === 0) {
      console.log("Tidak ada todo yang tersedia!");
    } else {
      console.log("Daftar todo:");
      data.forEach((data, index) => {
        console.log(
          `${index + 1}. ${data.isComplete ? "[x]" : "[ ]"} ${data.title}`
        );
      });
    }
    break;

  case "list:outstanding":
    if (process.argv[3] === "asc") {
      for (let i = 0; i < data.length; i++) {
        if (!data[i].isComplete) {
          console.log(
            `${i + 1}. ${data[i].isComplete ? "[x]" : "[ ]"} ${data[i].title}`
          );
        }
      }
    } else if (process.argv[3] === "desc") {
      for (let i = data.length - 1; i >= 0; i--) {
        if (!data[i].isComplete) {
          console.log(
            `${i + 1}. ${data[i].isComplete ? "[x]" : "[ ]"} ${data[i].title}`
          );
        }
      }
    }
    break;

  case "list:complete":
    if (process.argv[3] === "asc") {
      for (let i = 0; i < data.length; i++) {
        if (data[i].isComplete) {
          console.log(
            `${i + 1}. ${data[i].isComplete ? "[x]" : "[ ]"} ${data[i].title}`
          );
        }
      }
    } else if (process.argv[3] === "desc") {
      for (let i = data.length - 1; i >= 0; i--) {
        if (data[i].isComplete) {
          console.log(
            `${i + 1}. ${data[i].isComplete ? "[x]" : "[ ]"} ${data[i].title}`
          );
        }
      }
    }
    break;

  case "tag":
    const tags = process.argv.slice(4);

    if (isNaN(taskId) || taskId < 0 || taskId >= data.length) {
      console.log("Mohon pilih task yang ingin anda berikan tag!");
    } else if (tags.length === 0) {
      console.log("Mohon masukkan setidaknya satu tag!");
    } else {
      data[taskId].tags.push(...tags);
      writeFileSync("c13.json", JSON.stringify(data, null, 2));
      console.log(
        `Tag "${tags.join(", ")}" telah berhasil ditambahkan ke task ${taskId}!`
      );
    }
    break;

  case "help":
    console.log(">>> JS TODO <<<");
    console.log("$ node c13.js <command>");
    console.log("$ node c13.js list");
    console.log("$ node c13.js task <task_id>");
    console.log("$ node c13.js add <task_content>");
    console.log("$ node c13.js delete <task_id>");
    console.log("$ node c13.js complete <task_id>");
    console.log("$ node c13.js uncomplete <task_id>");
    console.log("$ node c13.js list:outstanding asc|desc");
    console.log("$ node c13.js list:complete asc|desc");
    console.log(
      "$ node c13.js tag <task_id> <tag_name_1> <tag_name_2> ... <tag_name_N>"
    );
    console.log("$ node c13.js filter <tag_name>");
    break;

  default:
    if (command.startsWith("filter:")) {
      const tagToFilter = command.split(":")[1];
      let found = false;

      for (let i = 0; i < data.length; i++) {
        if (data[i].tags.includes(tagToFilter)) {
          const tags =
            data[i].tags.length > 0 ? `Tags: #${data[i].tags.join(" #")}` : "";
          console.log(`${i}. ${data[i].isComplete ? "[x]" : "[ ]"} ${
            data[i].title
          } 
            ${tags}`);
          found = true;
        }
      }

      if (!found) {
        console.log(`Tidak ada task dengan tag "${tagToFilter}"`);
      }
    } else {
      console.log('ketik "node c13.js help" jika anda tidak tahu perintahnya!');
    }
    break;
}
