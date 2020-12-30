const express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");

const scrap = require("./routes/scrap")


const puppeteer = require('puppeteer');



const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());


app.post("/scrap", scrap)


const port = 3002 || process.env.PORT;
console.log(port);

app.listen(port, () => {

  console.log(`listening on port ${port}...`);





});



