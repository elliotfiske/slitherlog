var express = require('express');
var app = express();
var sequelize = require('./sequelize');
var bodyParser = require('body-parser')

app.set('port', (process.env.PORT || 5000));

// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
   //  res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// parse application/json
app.use(bodyParser.json())

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

app.get('/logEntry', function(req, res) {
   return sequelize.LogEntry.findAll()
   .then(function(logs) {
      return res.json(logs);
   })
   .catch(function(err) {
      res.json({"ERROR" : JSON.stringify(err)});
   });
});

app.post('/logEntry', function(req, res) {
   console.log(req.body);

   if (req.body.message === undefined || req.body.botId === undefined) {
      res.sendStatus(401).json("GRRR YOU NEED TO HAVE A BODY WITH A MESSAGE, YOU HAVE " + JSON.stringify(req.body));
      return;
   }

   return sequelize.LogEntry.create(req.body)
   .then(function(newGuy) {
      res.json('OK!')
   })
   .catch(function(err) {
      res.json({"ERROR" : JSON.stringify(err)});
   });
});
