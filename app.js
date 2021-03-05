// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const date = require(__dirname + "/date.js");

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

// let items = ["Buy Food", "Cook Food", "Eat Food"];
// let workItems = [];

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/todolistDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Create an Items Schema
const itemsSchema = ({
  name: String,
});

// Create a Collection: Item
const Item = mongoose.model("Item", itemsSchema);

// Default Items
const item1 = new Item({
  name: "Welcome to your ToDo List"
});

const item2 = new Item({
  name: "Click + Button to Add New Item"
});

const item3 = new Item({
  name: "<== Check this to Delete An Item"
});

const defaultItems = [item1, item2, item3];

app.get("/", function(req, res) {
  // day = date.getDate();
  Item.find({}, function(err, fetchedItems) {
    if (fetchedItems.length === 0){
        Item.insertMany(defaultItems, function(err) {
          if (err) {
            console.log(err);
          } else {
            console.log("Default Items Added to the Database");
          }
        });
        res.redirect("/");
    } else {
      res.render("list", {
         listTitle: "Today",
         items: fetchedItems
       });
    }
  });
});

app.post("/", function(req, res) {
  const itemName = req.body.newItem;
  const item = new Item({
    name: itemName
  });
  item.save();
  res.redirect("/");
  // if (req.body.list === "Work") {
  //   workItems.push(item);
  //   res.redirect("/work");
  // } else {
  //   items.push(item);
  //   res.redirect("/");
  // }
});

app.post("/delete", function(req, res){
  const checkedItemId = req.body.checkbox;
  Item.deleteOne({_id: checkedItemId}, function(err){
    if (err){
      console.log(err);
    } else {
      console.log("Item Deleted from the Database");
      res.redirect("/");
    }
  });
});

//
// app.get("/work", function(req, res) {
//   res.render("list", {
//     listTitle: "Work List",
//     items: workItems
//   });
// });

app.listen(3000, function() {
  console.log("Server started on port 3000!");
});
