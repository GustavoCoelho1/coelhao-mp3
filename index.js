const express = require("express");
const cors = require("cors")
const bodyParser = require("body-parser");

const config = require("./src/lib/config");
const router = require("./src/routes");

const app = express();

//Middlewares
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(router);

app.get("/", (req, res) => res.json({uepa: "Ui"}))

app.listen(config.PORT, () => console.log('A aplicação está rodando no url: ', config.HOST_URL));