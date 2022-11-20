const express = require("express");
const mongoose = require("mongoose");
const Router = require("./routes");
const cors = require('cors')
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
//app.use(express.json());

mongoose.connect(
    `mongodb://localhost:27017/question-form-builder`,
    {
        useNewUrlParser: true
    }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});

app.use(cors());

app.use(Router);

app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/views'));


app.listen(3000, () => {
    console.log("Server is running at port 3000");
});