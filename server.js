var express = require('express');
var morgan = require('morgan');// to log requests from users
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var engine = require('ejs-mate');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('express-flash');

//requiring models/user.js
var User = require('./models/user');


var app = express();

//mongodb connection
mongoose.connect('mongodb://root:root@ds017678.mlab.com:17678/ecommerce', function(err){
  if(err) {
    console.log(err);
  } else{
    console.log('Connected to Database');
  }
});

//Middlewares
app.use(express.static(__dirname + '/public')); //pointing static files location
app.use(morgan('dev'));
app.use(bodyParser.json()); //Returns middleware that only parses json
app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieParser());
app.use(session({
   resave: true,
   saveUninitialized: true,
   secret:'JojoKey'
}));
app.use(flash());


app.engine('ejs',engine);
app.set('view engine', 'ejs');

var mainRoutes = require('./routes/main');
var userRoutes = require('./routes/user');

app.use(mainRoutes);
app.use(userRoutes);

//routes

app.get('/name', function(req, res){
  var name = 'Jojo';
  res.json("My name is "+name);
});


//server run code
app.listen(3000, function(err){
  if(err) throw err;
  console.log("Server running from port 3000 ");
});
