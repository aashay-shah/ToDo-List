// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

let items = ["Buy Food", "Cook Food", "Eat Food"];

app.get("/", function(req, res){
  let today = new Date();
  let options = {
    weekday: "long",
    month: "long",
    day: "numeric"
  };
  let day = today.toLocaleDateString("en-US", options);
  res.render("list", {day: day, items: items});
});

app.post("/", function(req, res){
  let item = req.body.newItem;
  items.push(item);
  res.redirect("/");
});

app.listen(3000, function(){
  console.log("Server started on port 3000!");
});
