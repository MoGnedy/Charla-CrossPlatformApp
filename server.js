const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient


var messages = [];
var privateMessages = [];
var users = {};
var Mydb;
var Client;
var Clients = [];
var user_data;
//middlewares
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/www', express.static(__dirname + '/public'));

app.use(bodyParser.json())
//routing
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
})

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
})

app.post("/api/users", function(request, response) {
  var users = Mydb.collection('users').find().toArray(function(err, users) {

    response.send(users);
    response.send({
      status: 1
    });
  });

})

app.post('/api/signup', function(request, response) {
  if (request.body.username && request.body.email && request.body.password) {


    Mydb.collection('users').save(request.body, function(err, res) {

    });
    response.send({
      status: 1
    });
  } else {
    response.send({
      status: 0
    });
  }

})
app.post('/api/login', function(request, response) {
  Mydb.collection('users').find({
    'email': request.body.email,
    'password': request.body.password
  }).toArray(function(err, res) {
    if (res.length) {
      response.send({
        status: 1,
        userdata: res
      });
    } else {
      response.send({
        status: 0
      })

    }

  });
});


app.post('/api/getprivate', function(request, response) {
  if (request.body.private_code) {
    Mydb.collection('privatemsgs').find({
      'private_code': request.body.private_code
    }).toArray(function(err, res) {
      if (res.length) {
        response.send({
          status: 1,
          msgsdata: res
        });
      } else {
        response.send({
          status: 0
        })
      }


    })
  }
})

app.post('/api/saveprivate', function(request, response) {
  if (request.body.private_code) {

    Mydb.collection('privatemsgs').save(request.body, function(err, res) {

    });
    response.send({
      status: 1
    });
  } else {
    response.send({
      status: 0
    });
  }

})




app.get('*', function(request, response) {
  response.sendStatus(404);
})
//socket

io.on('connection', function(client) {
  console.log("Server is runing");
  console.log(client.id);
  client.on('message', function(msg) {
    messages.push(msg)
    client.broadcast.emit("message", messages)
    client.emit("message", messages)


  })
  client.emit('message', messages);


  client.on('disconnect', function() {
    delete users[client.id];
    if (Clients[client.id]) {
      delete Clients[client.id];
    }
    client.broadcast.emit("user", users)
    client.emit("user", users)

  })

  client.on('login', function(user) {
    console.log("userLogedIn");
    users[client.id] = user

    Clients[client.id] = ({
      'username': user,
      'client': client
    });
    client.broadcast.emit("message", messages)
    client.emit("message", messages)
    client.broadcast.emit("user", users)
    client.emit("user", users)
  })

  client.on('user', function(user) {
    client.broadcast.emit("message", messages)
    client.emit("message", messages)
    client.broadcast.emit("user", users)
    client.emit("user", users)
  })
  client.on('logout', function(user) {
    delete users[client.id];
    client.broadcast.emit("user", users)
    client.emit("user", users)
  })

  client.on('offline', function(user) {
    delete users[client.id];
    client.broadcast.emit("user", users)
    client.emit("user", users)
  })

  client.on('online', function(user) {
    users[client.id] = user;
    client.broadcast.emit("user", users)
    client.emit("user", users)
  })

  client.on('privateMessage', function(messageData) {
    var anotherUserName = messageData[0];
    var anotherClientSocket;
    for (var key in Clients) {
      if (Clients[key].username == anotherUserName) {
        anotherClientSocket = Clients[key].client
      }
    }
    messageData = [messageData[2], messageData[1]]

    anotherClientSocket.emit('privateMessage', messageData)

  })

})




//listing
var url = 'mongodb://127.0.0.1:27017/chatdb';
MongoClient.connect(url, function(err, db) {



  if (!err) {
    Mydb = db;
    server.listen(3000, function() {


    })

  } else {

    console.log(err);
  }



})
