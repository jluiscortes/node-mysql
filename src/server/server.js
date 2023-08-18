const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const user = require("../routes/user.route");
const compression = require("compression");
const helmet = require("helmet");
const app = express();
const { helperRoutes, generalError } = require("../helpers/routes.helper");

app.use(compression());
app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(user.routes);
app.use(helperRoutes);
app.use(generalError);

module.exports = app;
