var express = require('express');
var path = require('path');
var methodOverride = require('method-override');
var logger = require('morgan');
var bluebird = require('bluebird');
var exphbs = require('express-handlebars');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator  = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
// var mongo = require('mongodb');
// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/loginapp-btraversy');
// var db = mongoose.connection;

var routes = require('./routes/index');
var users = require('./routes/users');
// var queries = require('./db');  //knex is already required by each query file

//initialize app
var app = express();

//set view engine and view render path
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//COOKIE SESSION vs. EXPRESS SESSION - cookies store users' session data on the browser so that your site can recognize the user who is accessing it. The cookie data from the users client is matched to a corresponding data location on your server that contains their relevant account data. Cookies expire when you want them to, but can be tampered with as they exist on the client. Express session gives other options, such as storing session data in your database instead. This is good because for tracking short-term info such as variables for measuring, querying, etc. However, the session ends when the user exits your site.
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

//Passport init
app.use(passport.initialize());
app.use(passport.session());

//comes copy-pasted from the express-validator git page under "Middleware Options"
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

//Connect Flash
app.use(flash());
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

app.use('/', routes);
app.use('/users', users);

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function() {
  console.log('Sever started on port ' + app.get('port'));
});
