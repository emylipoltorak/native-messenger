const express = require('express');
const bodyParser = require('body-parser');
const Pusher = require('pusher');

const pusherConfig = require('./pusher.json');
const pusherClient = new Pusher(pusherConfig);

const app = express();
app.use(bodyParser.json());

app.put('/users/:name', function(request, result) {
  console.log('User joined: ' + request.params.name);
  pusherClient.trigger('chat_channel', 'join', {
    name: request.params.name
  });
  result.sendStatus(204);
});

app.delete('/users/:name', function(request, result) {
  console.log('User left: ' + request.params.name);
  pusherClient.trigger('chat_channel', 'part', {
    name: request.params.name
  });
  result.sendStatus(204);
});

app.post('/users/:name/messages', function(request, result) {
  console.log('User ' + request.params.name + ' sent message: ' + request.body.message);
  pusherClient.trigger('chat_channel', 'message', {
    name: request.params.name,
    message: request.body.message
  });
  result.sendStatus(204);
});

app.listen(4000, function() {
  console.log('App listening on port 4000');
});
