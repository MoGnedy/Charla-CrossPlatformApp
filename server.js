const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient


var messages=[];
var users=[];
var Mydb;
var Client;
var user_data;
//middlewares
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/www', express.static(__dirname + '/public'));

app.use(bodyParser.json())
//routing
app.all('*',function(req,res,next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();

})
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
})

app.post("/api/users",function(request,response){
    var users =  Mydb.collection('users').find().toArray(function(err,users){

  response.send(users);
  response.send({status:1});
    });

})

app.post('/api/signup', function(request, response) {
  console.log(request.body);
  if(request.body.username && request.body.email && request.body.password)
 {


   Mydb.collection('users').save(request.body,function(err,res){

     console.log(res);
   });
   response.send({status:1});}

   else{response.send({status:0});}

})
app.post('/api/login', function(request, response) {
console.log(request.body);
Mydb.collection('users').find({'email':request.body.email,'password':request.body.password}).toArray(function(err,res){

console.log(res);
users.push(res[0]);
// user_data = res;
response.send({status:1,userdata:res});
});


app.get('*', function(request, response) {
  response.sendStatus(404);
})
//socket

io.on('connection',function(client){
  console.log("connected", client.id);
   client.on('message',function(msg){
    console.log(msg);
    messages.push(msg)
    client.broadcast.emit("message",messages)
    client.emit("message",messages)
        console.log("message");


  })
  client.emit('message',messages)
 
})
// io.on('connection', function(client) {
//   Client=client;
//   console.log("connected", client.id);
//   // client.broadcast.emit("message",messages)
//   // client.broadcast.emit('user',users)
//   // client.emit('user',users)
//   // client.emit('message',messages)
//
//   client.on('message', function(msg) {
//     console.log(msg);
//     messages.push(msg)
//     client.broadcast.emit("message", messages)
//     client.emit("message", messages)
//   })
//
//   client.on('login', function(user) {
//     console.log("server 2 users");
//     console.log(user);
//     users.push(user);
//     users.pop();
//     console.log("after login users =", users, "user = ", user);
//     client.broadcast.emit("message", messages)
//     client.emit("message", messages)
//     client.broadcast.emit("user", users)
//     client.emit("user", users)
//   })
//
//   client.on('user', function(user) {
//     console.log("server 2 users");
//     console.log(user);
//     //users.push(user)
//     client.broadcast.emit("message", messages)
//     client.emit("message", messages)
//     client.broadcast.emit("user", users)
//     client.emit("user", users)
//   })
//   client.on('close', function(user) {
//     var index = users.indexOf(user);
//     if (index > -1) {
//       users.splice(index, 1);
//     }
//     client.broadcast.emit("user", users)
//     client.emit("user", users)
//   })
// })

//listing
var url= 'mongodb://127.0.0.1:27017/chatdb';
MongoClient.connect(url,function(err,db){



  if(!err){
Mydb=db;
    server.listen(3000,function(){


  console.log('server is working');
})

  }else{

    console.log(err);
  }



})
