const express = require("express");
const { json } = require("express");
const route = require("./route/auth");

const app = express();
app.use(json());
app.use("/", route);

const PORT = 3000;

app.listen(PORT, () => {
  console.log("Server running");
});
