const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const port = 4173;
const host = "127.0.0.1";
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".wav": "audio/wav",
  ".m4a": "audio/mp4",
};

http
  .createServer((request, response) => {
    const url = new URL(request.url, `http://${host}:${port}`);
    const pathname = url.pathname === "/" ? "/index.html" : url.pathname;
    const requestedPath = path.normalize(path.join(root, decodeURIComponent(pathname)));

    if (!requestedPath.startsWith(root)) {
      response.writeHead(403);
      response.end("Forbidden");
      return;
    }

    fs.readFile(requestedPath, (error, data) => {
      if (error) {
        response.writeHead(404);
        response.end("Not found");
        return;
      }

      response.writeHead(200, {
        "Content-Type": types[path.extname(requestedPath)] || "application/octet-stream",
      });
      response.end(data);
    });
  })
  .listen(port, host, () => {
    console.log(`Programmheft-Prototyp: http://${host}:${port}/`);
  });
