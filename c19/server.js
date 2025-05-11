import { createServer } from "http";
import { readFileSync, writeFileSync } from "fs";
import querystring from "querystring";
import { parse } from "url";

const data = JSON.parse(
  readFileSync("data.json", { encoding: "utf8", flag: "r" })
);
const index = readFileSync("index.html", "utf-8");
const form = readFileSync("form.html", "utf-8");
const css = readFileSync("style.css", "utf-8");

createServer(function (req, res) {
  if (req.url === "/style.css") {
    res.writeHead(200, { "Content-Type": "text/css" });
    res.end(css);
    return;
  }

  if (req.url == "/") {
    let html = "";

    data.forEach((item, index) => {
      html += `
      <tr>
          <td>${index + 1}</td>
          <td>${item.name}</td>
          <td>${item.height}</td>
          <td>${item.weight}</td>
          <td>${item.birthdate}</td>
          <td>${item.isMarried ? "Yes" : "Not Yet"}</td>
          <td><a href="/edit?id=${index}">Update</a><a href="/delete?id=${index}">Delete</a></td>
        </tr>
      `;
    });

    let result = index.replace("{table_content}", html);

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(result);
  } else if (req.url == "/add") {
    if (req.method === "POST") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        const formData = querystring.parse(body);
        const newFormData = {
          name: formData.name,
          height: Number(formData.height),
          weight: Number(formData.weight),
          birthdate: formData.birthdate,
          isMarried: formData.isMarried === "true",
        };
        data.push(newFormData);
        writeFileSync("data.json", JSON.stringify(data, null, 2));
        res.writeHead(302, { location: "/" });
        res.end();
      });
    } else {
      let addForm = form
        .replace("{name}", "")
        .replace("{height}", "")
        .replace("{weight}", "")
        .replace("{birthdate}", "")
        .replace(
          '<option value="">have you married ?</option>',
          '<option value="" selected>have you married ?</option>'
        )
        .replace(
          '<option value="true">Yes</option>',
          '<option value="true">Yes</option>'
        )
        .replace(
          '<option value="false">Not Yet</option>',
          '<option value="false">Not Yet</option>'
        );

      addForm = addForm.replace('action=""', 'action="/add"');

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(addForm);
    }
  } else if (req.url.startsWith("/edit")) {
    const params = parse(req.url, true).query;
    const indexParam = Number(params.id);

    if (isNaN(indexParam) || !data[indexParam]) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Data not found");
      return;
    }

    if (req.method === "POST") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        const formData = querystring.parse(body);
        const updatedData = {
          name: formData.name,
          height: Number(formData.height),
          weight: Number(formData.weight),
          birthdate: formData.birthdate,
          isMarried: formData.isMarried === "true",
        };
        data[indexParam] = updatedData;
        writeFileSync("data.json", JSON.stringify(data, null, 2));
        res.writeHead(302, { location: "/" });
        res.end();
      });
    } else {
      const entry = data[indexParam];
      let editHtml = form
        .replace("<title>Adding data</title>", "<title>Updating data</title>")
        .replace("{name}", entry.name)
        .replace("{height}", entry.height)
        .replace("{weight}", entry.weight)
        .replace("{birthdate}", entry.birthdate)
        .replace(
          '<option value="true">Yes</option>',
          `<option value="true" ${
            entry.isMarried ? "selected" : ""
          }>Yes</option>`
        )
        .replace(
          '<option value="false">Not Yet</option>',
          `<option value="false" ${
            !entry.isMarried ? "selected" : ""
          }>Not Yet</option>`
        );

      editHtml = editHtml.replace(
        'action=""',
        `action="/edit?id=${indexParam}"`
      );

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(editHtml);
    }
  } else if (req.url.startsWith("/delete")) {
    const params = parse(req.url, true).query;
    const indexParam = Number(params.id);

    if (isNaN(indexParam) || !data[indexParam]) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Data not found");
      return;
    }

    data.splice(indexParam, 1);
    writeFileSync("data.json", JSON.stringify(data, null, 2));
    res.writeHead(302, { location: "/" });
    res.end();
  } else {
    res.writeHead(404);
    res.end("Not Found");
  }
}).listen(3000);
