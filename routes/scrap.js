const express = require("express");
const scrap = require("../controllers/scrap");

const router = express.Router();

router.post("/scrap",scrap.scrap );

module.exports = router;
