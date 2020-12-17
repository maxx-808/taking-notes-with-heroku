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

module.exports = router;
