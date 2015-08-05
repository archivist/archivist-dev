var http = require('http');
var express = require('express');
var path = require('path');

var fs = require('fs');
var sass = require('node-sass');
var bodyParser = require('body-parser');
var _ = require('lodash');

var app = express();
var port = process.env.PORT || 5000;
var browserify = require("browserify");
var babelify = require("babelify");
var es6ify = require("es6ify");

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.json({limit: '3mb'}));
app.use(bodyParser.urlencoded({ extended: true }));

// use static server
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "data")));
app.use(express.static(path.join(__dirname, "node_modules/archivist-core/browser/styles")));

// Backend
// --------------------

app.get('/reader/reader.js', function (req, res, next) {
  browserify({ debug: true, cache: false })
    .add(path.join(__dirname, "reader", "reader.js"))
    .bundle()
    .on('error', function(err, data){
      console.error(err.message);
      res.send('console.log("'+err.message+'");');
    })
    .pipe(res);
});


app.get('/writer/writer.js', function (req, res, next) {
  browserify({ debug: true, cache: false })
    .add(path.join(__dirname, "writer", "writer.js"))
    .bundle()
    .on('error', function(err, data){
      console.error(err.message);
      res.send('console.log("'+err.message+'");');
    })
    .pipe(res);
});

app.get('/browser/browser.js', function (req, res, next) {
  browserify({ debug: true, cache: false })
    .add(path.join(__dirname, "browser", "browser.js"))
    .bundle()
    .on('error', function(err, data){
      console.error(err.message);
      res.send('console.log("'+err.message+'");');
    })
    .pipe(res);
});


var handleError = function(err, res) {
  console.error(err);
  res.status(400).json(err);
};

var renderSass = function(cb) {
  sass.render({
    file: path.join(__dirname, "writer", "writer.scss"),
    sourceMap: true,
    outFile: 'writer.css',
  }, cb);
};

app.get('/writer/writer.css', function(req, res) {
  renderSass(function(err, result) {
    if (err) return handleError(err, res);
    res.set('Content-Type', 'text/css');
    res.send(result.css);
  });
});

app.get('/writer/writer.css.map', function(req, res) {
  renderSass(function(err, result) {
    if (err) return handleError(err, res);
    res.set('Content-Type', 'text/css');
    res.send(result.map);
  });
});

app.listen(port, function(){
  console.log("Lens running on port " + port);
  console.log("http://127.0.0.1:"+port+"/");
});

// Export app for requiring in test files
module.exports = app;