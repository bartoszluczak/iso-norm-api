const express = require('express');
const fs = require('fs');
var _ = require('lodash');

const app = express();
const port = 3010;

app.get("/", (req, res) => {
  res.json("Welcome to ISO 27001 norms API")
});

app.get("/rest/langs", async (req, res) => {

    const files = fs.readdirSync("./db");
    const languages = [];

    files.forEach(file => {
      const fileName = file.split(".")[0];

      if (fileName) {
        languages.push(fileName);
      }
    })

    res.json(languages.length > 0 ? languages : "No results to display");
})

app.get("/rest/:lang/all", (req, res) => {
  fs.readFile(`./db/${req.params.lang}.json`, async(err, data) => {
    if (err) throw err;
    const norms = await JSON.parse(data);
    res.json(norms);
  });
})

app.get("/rest/:lang/:number", (req, res) => {
    fs.readFile(`./db/${req.params.lang}.json`, async(err, data) => {
      if (err) throw err;
      const parseData = await JSON.parse(data);

      const normsNumbers = req.params.number.split("&");

      const norms = [];

      normsNumbers.forEach(normItem => {
        const foundItem = _.get(parseData.norms, normItem.trim());
        if (foundItem) {
          norms.push(foundItem);
        }
      });

      const result = norms.length > 0 ? norms : "No result to display";

      res.json(result);
    });

})


app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})