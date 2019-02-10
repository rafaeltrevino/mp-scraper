const express = require('express');
const exphbs = require('express-handlebars');
const logger = require('morgan');
const mongoose = require("mongoose");

var db = require("./models");

const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(express.static("public"));
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mp-scraper";
mongoose.connect(MONGODB_URI, {useNewUrlParser: true});

// Routes
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

const PORT = process.env.PORT || 3001;
app.listen(PORT, function () {
    console.log(`Server listening on: http://localhost:${PORT}`)
});
