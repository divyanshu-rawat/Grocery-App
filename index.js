var express = require('express');
var app = express();

app.use(express.static('public', { maxAge: 4 * 60 * 60 * 1000 /* 2hrs */ }));

app.listen(8000);
// console.log('Listening on port 3000!');