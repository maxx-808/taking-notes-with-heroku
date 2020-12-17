const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const uniqid = require("uniqid");

router.get("/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

router.post("/notes", (req, res) => {
  const newNote = req.body;
  const newId = uniqid();

  newNote.id = newId;

  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    let allsaved = JSON.parse(data);

    fs.writeFile("./db/db.json", JSON.stringify(allsaved), (err) => {
      if (err) return res.JSON({ err: "problem adding" });
      console.log("Note created!");
    });
  });
  res.redirect("/notes");
});

module.exports = router;
