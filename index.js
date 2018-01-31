const express = require('express');
const colors = require('colors');
const logger = require('morgan');
const bodyParser = require('body-parser');

// When we require 'express', we get a function that generates an instance of
// an express app. This object will be used to build a web server.
const app = express();
app.set('view engine', 'ejs')

app.use(logger('dev'));

// urlencoded is data format that looks like fullName=The+Tommy&message=Hello
// into an object


app.use(bodyParser.urlencoded({extended:true}));

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

const DOMAIN = 'localhost';
const PORT = 4800;
app.listen(PORT, DOMAIN, () => {
  console.log(`💻 Server listening on http://${DOMAIN}:${PORT}`);
});
