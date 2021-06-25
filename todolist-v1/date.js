
module.exports = date;

function date(){
    var today=new Date();
var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
var day=today.toLocaleDateString("hi-IN", options);
return day;}