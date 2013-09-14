var express = require('express')
  , app = express()
  , http = require('http')
  , server = http.createServer(app)
  ,Twit = require('twit')
  , io = require('socket.io').listen(server);

server.listen(8080);

// routing
app.get('/', function (req, res) {
res.sendfile(__dirname + '/index.html');
});

var watchList = ['love', 'hate'];
 var T = new Twit({
    consumer_key:         'xPfN5ib7ogAywGkJnXNpA'
  , consumer_secret:      '1ODeF1vvpzs0lyLu7OOL7qjfldeJrayWROc2kpYVVg'
  , access_token:         '621840778-AxgkoKIsiOhaBb87kkYlgzzvrBWvQD2j0kP5WBWU'
  , access_token_secret:  'mlBcTZKvcru1z1fgPp8VkoAkE3wMG6oW83vFBHBXLKM'
})

io.sockets.on('connection', function (socket) {
  console.log('Connected');


 var stream = T.stream('statuses/filter', { track: watchList })

  stream.on('tweet', function (tweet) {

    if (tweet.geo != null) {
      io.sockets.emit('stream',tweet);
    }

  });
}); 
