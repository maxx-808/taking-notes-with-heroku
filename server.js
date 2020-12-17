const express = require("express");
const app = express();
const PORT = 8080;

const apiRoutes = require("./routes/api-routes");
const clientRoutes = require("./routes/client-routes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`));
