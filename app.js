var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
const nunjucks = require('nunjucks')
const session = require('express-session')

require('dotenv').config();

var indexRouter = require('./routes/index');

var app = express();

var linkify = require('linkify-it')();

var MarkdownIt = require('markdown-it'), md = new MarkdownIt();
md.linkify.set({ fuzzyEmail: false });  // disables converting email to link

nunjucks.configure('views', {
  autoescape: true,
  express: app
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(session({
  secret: 'Bogus',
  resave: false,
  saveUninitialized: true,
  cookie: { sameSite: true }
}))
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

module.exports = app;
