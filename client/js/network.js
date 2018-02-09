function initNetwork(state){
    state.set("establishing connection")
    // Create a websocket connection, events over the socket will update the state
    let socket = null
    try {
        socket = new WebSocket(constants.webSocketAddress);
    } 
    catch (ex){
        state.set("connection failed to establish")
    }

    socket.onerror = function(event){
        state.set("socket error")
    }

    socket.onopen = function(event){
        state.set("connection open")
    }

    socket.onclose = function(event){
        state.set("connection closed")
    }

    socket.onmessage = function(event){
        const data = JSON.parse(event.data);
        if(data.type === "hello"){
            console.log(data.text)
        }

    }


}