const path = require('path');
const express = require('express');
const colors = require('colors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

console.log(__dirname);
// When we require 'express', we get a function that generates an instance of
// an express app. This object will be used to build a web server.
const app = express();
app.set('view engine', 'ejs')

app.use(logger('dev'));

// Use path.join to combine strings into directory paths.
// Example: path.join('fotorol', 'public') -> 'fotorol/public'

// __dirname is a global variable available only in Node. It
// gives the full beginning the root of the computer to
// the file using __dirname.
app.use(express.static(path.join(__dirname, 'public')));

// urlencoded is data format that looks like fullName=The+Tommy&message=Hello
// into an object


app.use(bodyParser.urlencoded({extended:true}));

app.use(cookieParser());

// URL http://www.example.com/home
//           |     Domain    |Path|

/* To respond to a request for URL from a client, use app.get, which takes two
arguments: a path to match, and a callback that gets a request and a response
argument in that order. */

// app.use((request, response, next) => {
//   console.log(
//     `${request.method.bold.blue} - ${request.path.underline} - ${new Date().toString().rainbow}`
//   );
//
//   next();
// });

app.use((req, res, next) => {
  const username = req.cookies.username;

  console.log(req.cookies);

  res.locals.username = null;
  // All properties of the 'locals' property of the response object are available
  // as variables in all forms. Use it to set glocal variables
  if (req.cookies.username) {
    res.locals.username = username;
  }

  next();
});


const home = (request, response) => {
  // response.send('Welcome home!');

  // Use response.render to send a template as the body of a response.
  // response.render will, by default, look for templates inside of the /views
  // directory. As its first argument, you must provide a string that is a path
  // beginning from the views directory
  response.render('home')
}

app.get('/home', home);
app.get('/', home);

// HTTP VERB: GET, PATH: /contact_us
app.get('/contact_us', (request, response) => {
  console.log(request.query);
  response.render('contact_us');
});

// HTTP VERB: POST, PATH: /contact_us
app.post('/contact_us', (request, response) => {
  // Data coming from a form using the method POST will be available on the
  // property "body" of request. It will only be set if bodyParser is installed
  // and configured correctly.
  const body = request.body;
  const fullName = body.fullName;
  const message = body.message;
  /* All properties of the object pass as a second argument to response.render will be
  available inside the rendered template as local variables*/
  response.render('thank_you', {fullName: fullName, message: message});
});

// HTTP VERB: GET, PATH: /sign_in
app.get('/sign_in', (req, res) => {
  res.render('sign_in')
});

// HTTP VERB: POST, PATH: /sign_in
const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 7
app.post('/sign_in', (req, res) => {
  const username = req.body.username;

  // To create a cookie, use the method `cookie` from the response
  // object. This method takes two required arguments: a name for
  // the cookie and a value. It takes an option third argument
  // which is object to configure the cookie. Here we use
  // it to set an expiration time on the cookie.
  if (username) res.cookie('username', username, {maxAge: COOKIE_MAX_AGE});

  // When using this method, cookieParser will create a header
  // in the response to set the cookie which might look like this:
  // Set-Cookie:username=jonsnow; Max-Age=604800; Path=/; Expires=Thu,08 Feb 2018 18:55:50 GMT

  res.redirect('/');
});


const DOMAIN = 'localhost';
const PORT = 4800;
app.listen(PORT, DOMAIN, () => {
  console.log(`💻 Server listening on http://${DOMAIN}:${PORT}`);
});
