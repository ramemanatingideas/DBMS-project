var express = require("express"),
    app     = express(),
    mongoose= require('mongoose');

mongoose.connect('mongodb://localhost/population_monitoring', { useNewUrlParser: true });

// LITERACY RATE - male, female in rural, urban
var literacySchema = new mongoose.Schema({
  rural: {
    male: Number,
    female: Number
  },
  urban: {
    male: Number,
    female: Number
  }
});
var Literacy = mongoose.model("Literacy", literacySchema);

// INFANT MORTALITY RATE - male, female
var imrSchema = new mongoose.Schema({
  male: Number,
  female: Number
});
var Imr = mongoose.model("Imr", imrSchema);

// POPULATION - male, female
var populationSchema = new mongoose.Schema({
  male: Number,
  female: Number,
  cbr: Number,
  cdr: Number
});
var Population = mongoose.model("Population", populationSchema);

// STATE - symbol, name, tagline, description, area
var stateSchema = new mongoose.Schema({
  symbol: String,
  name: String,
  tagline: String,
  description: String,
  area: Number,
  population: populationSchema,
  imr: imrSchema,
  literacy: literacySchema
});
var State = mongoose.model("State", stateSchema);

var newState = new State({
  symbol: "CH",
  name: "",
  tagline: "",
  description: "",
  area: 0,
  population: {
    male: 0,
    female: 0 },
  imr: {
    male: 0,
    female: 0 },
  literacy: {
    rural: {
      male: 0,
      female: 0
    },
    urban: {
      male: 0,
      female: 0
    } }
});

// newState.save(function(err, state){
//   if(err){
//     console.log(err);
//   } else {
//     console.log(state);
//   }
// });

// APP CONFIG
app.set("view engine", "ejs");

// Routes
app.get("/", function(req, res){
  res.redirect("/map");
});

app.get("/admin", function(req, res){
  res.render("login")
});

app.get("/map", function(req, res){
  res.render("map");
});

app.get("/map/:state/details", function(req, res){
  //res.send("Details of "+ req.params.state +" can be seen here!");
  State.findOne({symbol: req.params.state}, function(err, state){
    if(err){
      console.log(err);
    } else {
      res.render("details", {state: state});
    }
  });
});

app.get("*", function(req, res){
  res.send("<h1>Error: 404</h1><br><h3>Page not found.</h3>")
});

app.listen(3000, function(){
  console.log("Population Monitoring Server has been initiated!");
});
