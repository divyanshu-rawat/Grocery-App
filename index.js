var express = require('express');
var app = express();

app.use(express.static('public', { maxAge: 4 * 60 * 60 * 1000 /* 2hrs */ }));

app.set('port', (process.env.PORT || 5000));

//For avoidong Heroku $PORT error
app.get('/', function(request, response) {
    var result = 'App is running'
    response.send(result);
}).listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});

// console.log('Listening on port 3000!');