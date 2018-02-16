"use strict";

process.title = "space-lizard-test"

const webSocketsServerPort = 1234
const webSocketServer = require("websocket").server
const http = require("http")

const server = http.createServer(function(request, response) {
    // We don"t need anything from the http server.
});

server.listen(webSocketsServerPort, function() {
    console.log("WebSocket server is listening on port [" + webSocketsServerPort + "].");
})

// Create the websocket server
const wsServer = new webSocketServer({
    httpServer: server
})

//Connect to local version of Redis
//Defaulted to localhost and port 6379
var redis = require('redis')
var redisClient = redis.createClient()

redisClient.on('connect', function () {
    console.log("Redis connected")
})

// Main websocket connection code.
wsServer.on("request", function(request) {
    // accept connection - you should check "request.origin" to
    // make sure that client is connecting from your website
    // (http://en.wikipedia.org/wiki/Same_origin_policy)
    // But I'm not doing this here, as its just a test...
    const connection = request.accept(null, request.origin); 
    console.log("User joined your channel!")

    // Say hello to the connected player.
    const data = {
        type: "hello",
        text: `Wow its working! Hi ${request.origin}.`
    }

    // Let's repeatedly send this
    //setInterval(() => connection.sendUTF(JSON.stringify(data)), 100)

    // On recieving a message.
    connection.on("message", function(message) {
        if (message.type === "utf8") {
            var dataString = message.utf8Data;
            var data = null;
            if(typeof dataString !== "undefined" && dataString !== null){
                try{
                    data = JSON.parse(dataString);
                }
                catch(ex){}
            }

            if(data === null){
                console.log("Invalid message dataString [" + dataString + "]");
                return;
            }
        }
    })

    // On disconnection.
    connection.on("close", function() {
        // Free up memory?
        console.log("DISCONNECTED    D:")
    })
})
