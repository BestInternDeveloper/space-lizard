function initState(){
    return {
        state: "initialised",
        set: function(s){this.state = s},
        // Value which will be updated by events from the server.
        // Null until the first server event with data is received.
        latest: null,
        // Client side forecast for rendering at 60fps
        forecast: null,
        // AI for our ship
        brain: null
    }
}