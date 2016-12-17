var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
var fs = require('fs');

// var db = require('./models');

var app = express();

// swig rendering boilerplate
nunjucks.configure('views', {noCache : true}); 
app.set('view engine', 'html');
app.engine('html', nunjucks.render);


// logging and body-parsing
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// statically serve front-end dependencies
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/jquery-easing', express.static(__dirname + '/node_modules/jquery-easing/dist'));


// serve any other static files
app.use(express.static(__dirname + '/public'));

// serve dynamic routes
// app.use(require('./routes'));

app.get("/", function(req, res, next){
  console.log("##################### root path ###############");

  // fs.readdir('/technologies', function read(err, data) {
  //     if (err) {
  //         throw err;
  //     }
  //     var content = data;

  //     // Invoke the next step here however you like
  //     console.log(content);   // Put all of the code here (not the best solution)
  //     // processFile();          // Or put the next step in a function and invoke it
  // });

  res.render('index',{});
});

// failed to catch req above means 404, forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// handle any errors
app.use(function (err, req, res, next) {
  console.error(err, err.stack);
  res.status(err.status || 500);
  res.render('error', {
    error: err
  });
});



// listen on a port
var port = 3000;
app.listen(port, function () {
  console.log('The server is listening closely on port', port);
  // db.sync()
  // .then(function () {
  //   console.log('Synchronated the database');
  // })
  // .catch(function (err) {
  //   console.error('Trouble right here in River City', err, err.stack);
  // });
});
