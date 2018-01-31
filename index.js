const express = require('express');
const colors = require('colors');
const logger = require('morgan');
// When we require 'express', we get a function that generates an instance of
// an express app. This object will be used to build a web server.
const app = express();
app.set('view engine', 'ejs')

app.use(logger('dev'));

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

app.get('/home', (request, response) => {
  // response.send('Welcome home!');

  // Use response.render to send a template as the body of a response.
  // response.render will, by default, look for templates inside of the /views
  // directory. As its first argument, you must provide a string that is a path
  // beginning from the views directory
  response.render('home')
});
app.get('/', (request, response) => {
  response.send('Almost home.....');
});

const DOMAIN = 'localhost';
const PORT = 4800;
app.listen(PORT, DOMAIN, () => {
  console.log(`💻 Server listening on http://${DOMAIN}:${PORT}`);
});
