import { readFile, writeFile } from "node:fs";

const command = process.argv[2];
const todo = process.argv.slice(3).join(" ");
const arg3 = process.argv[3];

let finalCommand = command;
if (command.startsWith("list:") && (arg3 === "asc" || arg3 === "desc")) {
  finalCommand = `${command} ${arg3}`;
} else if (command.startsWith("filter:")) {
  const tagName = command.split(":")[1];
  finalCommand = `filter:${tagName}`;
}

readFile("c13.json", function (err, data) {
  if (err) throw err;
  const todos = JSON.parse(data);
  const sortedTodos = [...todos];
  let taskId = parseInt(arg3) - 1;
  let count = 1;

  switch (finalCommand) {
    case "add":
      if (!todo) {
        console.log("Mohon ketik sesuatu!");
      } else {
        let newTodo = { title: todo, complete: false, tags: [] };
        todos.push(newTodo);
        writeFile("c13.json", JSON.stringify(todos, null, 2), (err) => {
          if (err) {
            console.log("Gagal menyimpan: ", err);
          } else {
            console.log(`"${todo}" telah berhasil ditambahkan!`);
          }
        });
      }
      break;

    case "task":
      if (isNaN(taskId) || taskId < 0 || taskId >= todos.length) {
        console.log("Task tidak tersedia!");
      } else {
        let task = todos[taskId];
        console.log(`Detail task: ${taskId + 1}`);
        console.log(`Title: ${task.title}`);
        console.log(`Complete: ${task.complete ? "selesai" : "belum selesai"}`);
        console.log(`Tags: ${task.tags.join(", ") || "-"}`);
      }
      break;

    case "delete":
      if (isNaN(taskId) || taskId < 0 || taskId >= todos.length) {
        console.log(
          "Todo yang ingin anda dihapus tidak ada, atau nilai yang anda masukan tidak valid!"
        );
      } else {
        let newTodos = todos.splice(taskId, 1)[0];
        writeFile("c13.json", JSON.stringify(todos, null, 2), (err) => {
          if (err) {
            console.log("Gagal menghapus!", err);
          } else {
            console.log(`"${newTodos.title}" berhasil dihapus!`);
          }
        });
      }
      break;

    case "list":
      console.log("Daftar Todo:");
      todos.forEach((todo, index) => {
        console.log(
          `${index + 1}. ${todo.complete ? "[x]" : "[ ]"} ${todo.title}`
        );
      });
      break;

    case "complete":
      if (isNaN(taskId) || taskId < 0 || taskId >= todos.length) {
        console.log(
          "Gunakan angka sesuai urutan untuk merubah todo yang anda mau!"
        );
      } else {
        if (!todos[taskId].complete) {
          todos[taskId].complete = true;
          writeFile("c13.json", JSON.stringify(todos, null, 2), (err) => {
            if (err) {
              console.log("Gagal merubah!", err);
            } else {
              console.log(`${todos[taskId].title} telah selesai!`);
            }
          });
        } else {
          console.log("Todo tidak tersedia atau sudah selesai");
        }
      }
      break;

    case "uncomplete":
      if (isNaN(taskId) || taskId < 0 || taskId >= todos.length) {
        console.log(
          "Gunakan angka sesuai urutan untuk merubah todo yang anda mau!"
        );
      } else {
        if (todos[taskId].complete) {
          todos[taskId].complete = false;
          writeFile("c13.json", JSON.stringify(todos, null, 2), (err) => {
            if (err) {
              console.log("Gagal merubah!", err);
            } else {
              console.log(`"${todos[taskId].title}" status telah dibatalkan!`);
            }
          });
        }
      }
      break;

    case "list:outstanding asc":
      for (let i = 0; i < sortedTodos.length; i++) {
        if (!sortedTodos[i].complete) {
          console.log(
            `${count}. ${sortedTodos[i].complete ? "[x]" : "[ ]"} ${
              sortedTodos[i].title
            }`
          );
          count++;
        } else {
          console.log("Semua sudah selesai");
        }
      }
      break;

    case "list:outstanding desc":
      count = sortedTodos.length;
      for (let i = sortedTodos.length - 1; i >= 0; i--) {
        if (!sortedTodos[i].complete) {
          console.log(
            `${count}. ${sortedTodos[i].complete ? "[x]" : "[ ]"} ${
              sortedTodos[i].title
            }`
          );
          count--;
        } else {
          console.log("Semua sudah selesai");
          return;
        }
      }
      break;

    case "list:complete asc":
      for (let i = 0; i < sortedTodos.length; i++) {
        if (sortedTodos[i].complete) {
          console.log(
            `${count}. ${sortedTodos[i].complete ? "[x]" : "[ ]"} ${
              sortedTodos[i].title
            }`
          );
          count++;
        }
      }
      if (count === 1) {
        console.log("Semua belum selesai");
      }
      break;

    case "list:complete desc":
      count = sortedTodos.length;
      for (let i = sortedTodos.length - 1; i >= 0; i--) {
        if (sortedTodos[i].complete) {
          console.log(
            `${count}. ${sortedTodos[i].complete ? "[x]" : "[ ]"} ${
              sortedTodos[i].title
            }`
          );
          count--;
        }
      }
      if (count === sortedTodos.length) {
        console.log("Semua belum selesai");
      }
      break;

    case "tag":
      let tag = process.argv.slice(4).join(" ");
      if (isNaN(taskId) || taskId < 0 || taskId >= todos.length) {
        console.log("Mohon pilih task yang ingin anda berikan tag!");
      } else {
        todos[taskId].tags.push(tag);

        writeFile("c13.json", JSON.stringify(todos, null, 2), (err) => {
          if (err) {
            console.log("Gagal menyimpan: ", err);
          } else {
            console.log(`"${tag}" telah berhasil ditambahkan ke dalam tag!`);
          }
        });
      }
      break;

    case finalCommand.startsWith("filter:") ? finalCommand : undefined:
      const filterTag = finalCommand.split(":")[1];
      const filteredTodos = todos.filter((todo) =>
        todo.tags.includes(filterTag)
      );

      if (filteredTodos.length === 0) {
        console.log(`Tidak ada todo dengan tag "${filterTag}".`);
      } else {
        console.log(`Todo dengan tag "${filterTag}":`);
        filteredTodos.forEach((todo, index) => {
          console.log(
            `${index + 1}. ${todo.complete ? "[x]" : "[ ]"} ${todo.title}`
          );
        });
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
      console.log('ketik "node c13.js help" jika anda tidak tahu perintahnya!');
      break;
  }
});
