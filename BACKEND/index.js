const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("ola mundo!");
});

app.listen(PORT, () => {
  console.log(`servidor rodando na porta: ${PORT}`);
});
