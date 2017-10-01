const APIAI_TOKEN = 'ad188bfb5b9144648df27472adbf1704';
const APIAI_SESSION_ID = 'c91c33b71a854dbf89c9e886a7f77037';

const express = require('express');
const app = express();

app.use(express.static(__dirname + '/views')); // html
app.use(express.static(__dirname + '/public')); // js, css, images

const server = app.listen(8000);
app.get('/', (req,res) => {
  res.sendFile('index.html');
});

const io = require('socket.io')(server);

const apiai = require('apiai')(APIAI_TOKEN);

io.on('connection', function(socket) {
  socket.on('chat message', (text) => {
    // Get a reply from API.AI
    let apiaiReq = apiai.textRequest(text, {
      sessionId: APIAI_SESSION_ID
    });

    apiaiReq.on('response', (response) => {
      // let aiText = response.result.fulfillment.speech;
      socket.emit('bot reply', aiText); // Sending result back to browser
    });

    apiaiReq.on('error', (error) => {
      console.log(error);
    });

    apiaiReq.end();
  })
});
