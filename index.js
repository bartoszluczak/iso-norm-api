const express = require('express');
const fs = require('fs');
var _ = require('lodash');

const app = express();
const port = 3010;

app.get("/", (req, res) => {
  res.json("Welcome to ISO 27001 norms API")
});

app.get("/rest/langs", async (req, res) => {
  await fs.readFile('./db/languages.json', async(err, data) => {
    if (err) throw err;
    const languages = await JSON.parse(data);
    res.json(languages);
  });
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
    const norms = _.get(parseData.norms, req.params.number);
    res.json(norms);
  });
})


app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})