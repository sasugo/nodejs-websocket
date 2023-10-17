const express = require("express");
const path = require("path");
const WebSocket = require("ws");
const app = express();

// Use the public directory for static file requests
app.use(express.static("public"));

// Start our WS server at 3001
const wss = new WebSocket.Server({ port: 3001 });

wss.on("connection", (ws) => {
  console.log("A new client connected!");
  ws.on("message", (data) => {
    console.log(`Message from client: ${data}`);

    // Modify the input and return the same.
    const parsed = JSON.parse(data);
    ws.send(
      JSON.stringify({
        ...parsed.data,
        // Additional field set from the server using the from field.
        // We'll see how this is set in the next section.
        messageFromServer: `Hello tab id: ${parsed.data.from}`,
      }),
    );
  });
  ws.on("close", () => {
    console.log("Sad to see you go :(");
  });
});

// Listen for requests for static pages at 3000
const server = app.listen(3000, function () {
  console.log("The server is running on http://localhost:" + 3000);
});
