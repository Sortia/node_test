var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);


// app.use('/api', api); // redirect API calls
app.use('/', express.static(__dirname + '/www')); // redirect root
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap



app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function(){
    console.log('HTTP server started on port 3000');
});


io.on('connection', function(socket){
    console.log('connected');


    socket.on('message', function (data) {
        console.log(data);

        if (data === '1') {
            socket.join('room1');
            socket.join('room2');
            console.log(io.sockets.adapter.rooms);
        }
        io.sockets.in('room1').emit('new_message', data)
        // io.emit('new_message', data);
    });


    // console.log(io.engine.clientsCount);



});



