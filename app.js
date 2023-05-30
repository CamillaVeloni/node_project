const express = require('express');
require("dotenv").config();

const body_parser = require('body-parser');
const UserRouter = require('./routers/user.router');
const ProductRouter = require('./routers/product.router');

const app = express();
app.use(body_parser.json());

app.use('/', UserRouter);
app.use('/', ProductRouter);

module.exports = app;