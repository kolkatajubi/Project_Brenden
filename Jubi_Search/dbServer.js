var db = require("./assets/dbSearch");

// Dependencies
const express = require("express");
const app = express();

const bodyparser = require("body-parser");

// Defining Path for URL Re-routes
var path = require("path");

// Body Parser will parse the HTML and return it in non-encoded format
app.use(
  bodyparser.urlencoded({
    extended: false
  })
);

// Body Parser will parse the HTML and return it in JSON format
app.use(bodyparser.json());

// Defining IP-Address and PORT number
const ipaddress = "0.0.0.0";
const port = 3126;

// Listening to the IP-Address:PORT number
app.listen(port, ipaddress, () =>
  console.log(`Listening at ${ipaddress}:${port}...`)
);
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/assets/jubi_search.html");
});
app.get("/backgroundImage", (req, res) => {
  res.sendFile(__dirname + "/assets/css/background.jpg");
});
app.get("/nameImage", (req, res) => {
  res.sendFile(__dirname + "/assets/css/name.jpg");
});
app.get("/emailImage", (req, res) => {
  res.sendFile(__dirname + "/assets/css/email.jpg");
});
app.get("/contactImage", (req, res) => {
  res.sendFile(__dirname + "/assets/css/contact.jpg");
});
app.get("/searchImage", (req, res) => {
  res.sendFile(__dirname + "/assets/css/search.jpg");
});
app.get("/css", (req, res) => {
  res.sendFile(__dirname + "/assets/css/styles.css");
});
app.get("/action", (req, res) => {
  res.sendFile(__dirname + "/assets/action.js");
});
app.get("/ajax_calls", (req, res) => {
  res.sendFile(__dirname + "/assets/ajax_calls.js");
});

app.post("/search", async (req, res) => {
  // console.log("search post called.." + JSON.stringify(req.body));
  console.log("Search post called.....");
  try {
    res.json(await db.search(req.body.search));
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

app.post("/createUser", async (req, res) => {
  console.log("user creation");
  try {
    res.json(await db.createUser(req.body));
  } catch (err) {
    console.log("createUser Error...." + JSON.stringify(err));
    res.json(err);
  }
});
