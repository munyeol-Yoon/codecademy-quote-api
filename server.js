const express = require("express");
const app = express();

const { quotes } = require("./data");
const { getRandomElement } = require("./utils");

const PORT = process.env.PORT || 4001;

app.use(express.static("public"));

app.get("/api/quotes/random", (req, res, next) => {
  const quote = getRandomElement(quotes);
  res.status(200).send({ quote: quote });
});

app.get("/api/quotes", (req, res, next) => {
  const name = req.query.person;
  const result = quotes.filter((quote) => {
    return quote.person === name;
  });

  if (!name) {
    res.status(200).send({ quotes: [] });
  } else {
    res.send({ quotes: result });
  }
});

app.post("/api/quotes", (req, res, next) => {
  if (!req.query.quote || !req.query.person) {
    return res.status(400).send();
  } else {
    const newQuote = {
      quote: req.query.quote,
      person: req.query.person,
    };
    quotes.push(newQuote);
    res.send({ quote: newQuote });
  }
});

app.listen(PORT, (req, res, next) => {
  console.log("Connect!");
});
