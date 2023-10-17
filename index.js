const express = require("express");
const path = require("path");
const WebSocket = require("ws");
const app = express();

app.use(express.static("public"));

const wss = new WebSocket.Server({ port: 3001 });
const toHMI = {
  signal1: "a",
  signal2: "b",
  signal3: "c",
};

wss.on("connection", (ws) => {
  console.log("A new client connected!");
  ws.on("message", (data) => {
    console.log(`Message from client: ${data}`);

    const parsed = JSON.parse(data);
    ws.send(
      JSON.stringify(
        toHMI,
        // ...parsed.data,
        // messageFromServer: `Hello tab id: ${parsed.data.from}`,
      ),
    );
  });
  ws.on("close", () => {
    console.log("Sad to see you go :(");
  });
});

const server = app.listen(3000, function () {
  console.log("The server is running on http://localhost:" + 3000);
});
