var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use('/static', express.static('public'));

var serveJSON = function (req, res) {
  var options = {
    root: __dirname + '/json/',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  var filename = 'resume.json';
  if ('wrap' in req.query) {
    filename = 'resume-mobile.json';
  }

  res.sendFile(filename, options, function (err) {
    if (err) {
      console.error(err);
      res.status(err.status).end();
    } else {
      console.log('Served JSON');
    }
  });
};

var serveHTML = function (req, res) {
  var options = {
    root: __dirname + '/public/',
    headers: {
      'Content-Type': 'text/html'
    }
  };

  res.sendFile('index.html', options, function (err) {
    if (err) {
      console.error(err);
      res.status(err.status).end();
    } else {
      console.log('Served HTML');
    }
  });
};

app.get('/', function (req, res) {
  if ('json' in req.query) {
    serveJSON(req, res);
  } else {
    serveHTML(req, res);
  }
});

app.listen(app.get('port'), function () {
  console.log('tobiasedwards-com server running on port', app.get('port'));
});
