// Kick off the space-lizard experience
(function(){
    // Inject a canvas into the page
    const ctx = initCanvas()
    // Initialise an state object
    const state = initState()
    // Get a renderer, for drawing the state to the canvas
    const renderer = getRenderer(ctx, state)
    // Establish contact with the server and begin accepting state changes
    initNetwork(state)
    // Initiate game update loop at 60 fps
    setInterval(() => mainLoop(renderer, state), 16)
})()

function initCanvas(){
    document.body.innerHTML += `<canvas id=${constants.canvasId} width=1000 height=800></canvas>`
    return document.getElementById(constants.canvasId).getContext("2d")
}

function mainLoop(renderer, state){
    renderer.render()
}