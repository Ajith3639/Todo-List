const date = require(__dirname + "/date.js");
const express = require("express");
var _ = require("lodash");
const app = express();
const mongoose = require("mongoose");
app.use(express.urlencoded());
app.use(express.static("public"));
app.set("view engine", "ejs");
mongoose.set("useFindAndModify", false);
mongoose.connect("mongodb://localhost:27017/todolistDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const itemSchema = new mongoose.Schema({
  name: String,
});
const Item = mongoose.model("Item", itemSchema);

const one = new Item({
  name: "welcome todo list",
});
const two = new Item({
  name: "Hit the + button to add elements",
});
const three = new Item({
  name: "<-- hit this to delete",
});
const defaultItems = [one, two, three];

const listSchema = {
  name: String,
  items: [itemSchema],
};

const List = mongoose.model("List", listSchema);
var day = date();


app.get("/", function (req, res) {
  Item.find({}, function (err, result) {
    if (result.length === 0) {
      Item.insertMany(defaultItems, function (err) {
        if (err) {
          console.log("Error in insserting");
        } else {
          console.log("Success");
        }
      });
      res.redirect("/");
    }
     else {
      res.render("list", { nowDay: day, newitem: result });
    }
  });
});


app.get("/:contentItem", function (req, res) {
  const contentItem = req.params.contentItem;
  List.findOne({ name: contentItem }, function (err, result) {
    if (!err) {
      if (!result) {
        const list = new List({
          name: contentItem,
          items: defaultItems,
        });
        list.save();
        res.redirect("/"+contentItem);
      }
     else {
      res.render("list", { nowDay: result.name, newitem: result.items });
      
    }}
  });
});




app.post("/", function (req, res) {

  const listname=req.body.list;
  const item = new Item({
    name: req.body.type,
  });

  if(listname===day){
      item.save();

  res.redirect("/");
  }
   else{
       List.findOne({name: listname}, function(err, foundList){
           if(err){
               console.log("error");
           }
           else{
               foundList.items.push(item);
           foundList.save();
           res.redirect("/"+ listname);
        }
           
       });

   }
});




app.post("/delete", function (req, res) {
  const checkedItem = req.body.checkbox;

  Item.findByIdAndRemove(checkedItem, function (err) {
    if (err) {
      console.log("error");
    } else {
      console.log("succesfully deleted");
      res.redirect("/");
    }
  });
});


app.listen(3000, function (req, res) {
  console.log("Server is up!");
});
