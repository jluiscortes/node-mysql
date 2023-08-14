const express = require("express");
const { ListSuscriptions } = require("../controllers/case.controller");
const router = express.Router();

router.post("/ListSuscriptions", ListSuscriptions);

module.exports = {
    routes: router,
};
