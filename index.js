const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const uid2 = require("uid2");

const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect("mongodb://localhost:4000", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Quot = require("./models/Quot");

// Only this page generates a token "it will also serve as a quote number" //
app.get("/type-de-bien", (req, res) => {
  const token = uid2(10);
  res.json({
    token: token
  });
});

// Full form data reception page //
app.post("/formulaire-termine", async (req, res) => {
  try {
    const newQuot = new Quot({
      quotation: req.body.quotation,
      type: req.query.type,
      etat: req.query.etat,
      usage: req.query.usage,
      situationAct: req.query.situationAct,
      ville: req.query.ville,
      pays: req.query.pays,
      montantC: req.query.montantC,
      montantT: req.query.montantT,
      notaire: req.query.notaire,
      total: req.query.total,
      check: req.query.check,
      email: req.query.email
    });
    await newQuot.save();
    res.json(newQuot);
  } catch (error) {
    res.status(400).json({ message: "An error occured" });
  }
});

app.listen(4000, () => {
  console.log("Server has started");
});
