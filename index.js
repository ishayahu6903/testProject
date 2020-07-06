var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connect");
});

var ContactSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  country: String,
  subject: String,
});
var ContactModel = mongoose.model('Contact', ContactSchema);
app.listen(6000, function () {
  console.log('Example app listening on port 3000!');
});


app.set('view engine', 'ejs');




app.post('/',function(req, res){
  var Fname = req.body.firstname;
  var Lname =req.body.lastname;
  var Country =req.body.country;
  var Subject =req.body.subject;
  var temp = {
    fname: Fname,
    lname: Lname,
    country: Country,
    subject: Subject
  };
  ContactModel.collection.insert(temp, function(err, decs){
    if(err)
    {
      return console.error(err);
    }
    else{
      ContactModel.find({}, function(err, result){
      console.log(result);
    })
        }
});
});

app.get('/', function (req, res) {
  res.render('HomePage');
 });
app.get('/FindTheStore', function (req, res) {
  res.render('FindTheStore');
 });
 app.get('/About', function (req, res) {
  res.render('About');
 });
 app.get('/FollowUs', function (req, res) {
  res.render('FollowUs');
 });
 app.get('/MyAcount', function (req, res) {
  res.render('MyAcount');
 });
 app.get('/Search', function (req, res) {
  res.render('Search');
});
app.get('/ContactUs', function (req, res) {
  res.render('ContactUs');
 });
 app.get('/SignIn', function (req, res) {
  res.render('SignIn');
 });
 app.get('/Register', function (req, res) {
  res.render('Register');
 });
