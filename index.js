const express = require('express');

// When we require 'express', we get a function that generates an instance of
// an express app. This object will be used to build a web server.
const app = express();

// URL http://www.example.com/home
//           |     Domain    |Path|

/* To respond to a request for URL from a client, use app.get, which takes two
arguments: a path to match, and a callback that gets a request and a response
argument in that order. */

app.get('/home', (request, response) => {
  response.send('Welcome home!');
});
app.get('/', (request, response) => {
  response.send('Almost home...');
});

const DOMAIN = 'localhost';
const PORT = 4800;
app.listen(PORT, DOMAIN, () => {
  console.log(`💻 Server listening on http://${DOMAIN}:${PORT}`);
});
