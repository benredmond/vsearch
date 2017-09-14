const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const request = require('request');
var express = require('express');
var path = require('path');
users = [];
connections = [];
http.listen(3000);
console.log("server running");

app.get('/', function(req, res){
  res.sendFile(__dirname + '/test.html');
});

io.on('connection', function(socket) { //when a connection is made
	connections.push(socket);
	console.log("a new connection has been made. There are now %s sockets connected.", connections.length);

	socket.on('disconnect', (data) => {
		connections.splice(connections.indexOf(socket), 1);
		console.log("Disconnected. There are now %s sockets connected.", connections.length);
	});
	socket.on('Add', (nums) => {
		let totalNum = parseInt(nums.firstNum) + parseInt(nums.secondNum);
		socket.emit('addedHTML', totalNum);
	});
});