import axios from "axios";
import * as express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";

import App from "./src/App";
import Context from "./src/Context";

const PORT = process.env.PORT || 5000;

const app = express();

// app.use(express.static());

app.set("veiw engine", "ejs");

app.use((req, res, next) => {
  res.header({ "Access-Control-Allow-Origin": "*" });
  next();
});

app.get("/", (req, res) => {
  axios.get("http://localhost:5000/list").then(({ data }) => {
    const app = ReactDOMServer.renderToString(<App items={data.list} />);
    res.render("index.ejs", { app: app });
  });
});

app.get("/app", async (req, res) => {
  res.write(`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <!-- <link rel="icon" href="%PUBLIC_URL%/favicon.ico" /> -->
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <!-- <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" /> -->
    <!--
      manifest.json provides metadata used when your web app is installed on a
      user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
    -->
    <!-- <link rel="manifest" href="%PUBLIC_URL%/manifest.json" /> -->
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root">
  `);

  const contextValue = { requests: [] };

  // For initial render update
  ReactDOMServer.renderToString(
    <Context.Provider value={contextValue}>
      <App />
    </Context.Provider>
  );

  await Promise.all(contextValue.requests);
  delete contextValue.requests;

  res.write(
    `<script>window.initialData=${JSON.stringify(contextValue)}</script>`
  );

  // second (actual) render
  const htmlStream = ReactDOMServer.renderToNodeStream(
    <Context.Provider value={contextValue}>
      <App />
    </Context.Provider>
  );

  htmlStream.pipe(res, { end: false });
  htmlStream.on("end", () => {
    res.write(`
      </div>
      </body>
      </html>
      `);
    res.end();
  });
});

app.get("/list", (req, res) => {
  res.status(200).json({
    list: ["lorem", "ipsum", "dolor", "net", new Date().toISOString()],
  });
});

app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
