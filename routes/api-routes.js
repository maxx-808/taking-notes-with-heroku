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
  var newNote = req.body;
  var newId = uniqid();

  newNote.id = newId;

  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    let allsaved = JSON.parse(data);

    allsaved.push(newNote);

    fs.writeFile("./db/db.json", JSON.stringify(allsaved), (err) => {
      if (err) return res.JSON({ err: "problem adding" });
      console.log("Note created!");
    });
  });
  res.redirect("/notes");
});

router.delete("/notes/:id", (req, res) => {
  let noteId = req.params.id;

  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) throw err;

    const allNotes = JSON.parse(data);
    const newNotes = allNotes.filter((note) => note.id != noteId);

    fs.writeFile("./db/db.json", JSON.stringify(newNotes), (err) => {
      if (err) throw err;
      console.log("Note is deleted!");
    });
    res.redirect("/notes");
  });
});

module.exports = router;
