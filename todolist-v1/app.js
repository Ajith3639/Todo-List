const date=require(__dirname+"/date.js");
const express=require("express");
var _ = require('lodash');
const app=express();
const mongoose=require("mongoose");
app.use(express.urlencoded())
app.use(express.static("public"));
app.set('view engine', 'ejs');
mongoose.set('useFindAndModify', false);
mongoose.connect("mongodb://localhost:27017/todolistDB",{useNewUrlParser:true,useUnifiedTopology: true});

const itemSchema=new mongoose.Schema({
    name: String
});
const Item=mongoose.model("Item",itemSchema);

const one=new Item({
   name:"welcome todo list"

});
const two=new Item({
    name:"Hit the + button to add elements"
 
 });
 const three=new Item({
    name:"<-- hit this to delete"
 
 });
 const defaultItems=[one,two,three];

 








app.get("/",function(req,res){
    let day=date();

    
    Item.find({},function(err,result){
        if(result.length===0)
        {
        Item.insertMany(defaultItems,function(err){
         if(err){
        console.log("Error in insserting");

    }
    else{
        console.log("Success")
    }
    
});
res.redirect("/");
} else{app.get('/:postName', function (req, res) {
    

       const titlename= _.lowerCase(req.params.postName);
       res.render("list",{nowDay:titlename,newitem:result});
    
       
    
    


})
    
}
    
});
    
    
});




app.post("/",function(req,res){
    const value=new Item({
        name:req.body.type});

    value.save();
    
    res.redirect("/");
     
    

} )
app.post("/delete",function(req,res){
    const checkedItem = req.body.checkbox;

    Item.findByIdAndRemove(checkedItem,function(err){
        if(err){
            console.log("error");

        }
        else{
            console.log("succesfully deleted")
            res.redirect("/");
        }
    })
})
app.listen(3000,function(req,res){
    console.log("Server is up!");
})