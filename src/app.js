const express = require("express");
const cors = require("cors");
const request = require("request");

const PORT = process.env.PORT || 8005;

const app = express();

const url = "https://www.githubstatus.com/";

app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  request(url, { json: true }, (err, req, body) => {
    let result = body.components;
    const filtro = [
      "Git Operations",
      "API Requests",
      "GitHub Pages",
      "GitHub Packages",
      "GitHub Actions",
      "Pull Requests",
    ];
    const FiltroItems = [];
    for (let i = 0; i < filtro.length; i++) {
      let regex = new RegExp(filtro[i], "gi");
      FiltroItems[i] = result.filter((item) => regex.test(item.name));
    }

    return res.send(FiltroItems);
  });
});

app.listen(PORT, () => {
  console.log("Servidor Rodando");
});
