// Kick off the space-lizard experience
(function(){
    // Define the memory object.
    const brain = {}
    // Inject a canvas into the page
    const ctx = initCanvas()
    // Initialise physics
    const physics = getPhysics(constants.canvasDimensions)
    // Initialise an state object
    const state = initState(brain)
    // Get a renderer, for drawing the state to the canvas
    const renderer = getRenderer(ctx, state, physics)
    // Get the parse
    const parser = getParser(brain)
    // Establish contact with the server and begin accepting state changes
    initNetwork(state)
    // Initiate game update loop at 60 fps
    setInterval(() => mainLoop(renderer, state, parser, physics), 16)
})()

function initCanvas(){
    // Inject the canvas
    document.body.innerHTML += `<canvas id=${constants.canvasId} width=${constants.canvasDimensions[0]} height=${constants.canvasDimensions[1]}></canvas>`
    // And the scripting box
    document.body.innerHTML += `<div id=${constants.editTextId} contenteditable="true">brain.torque = 1; brain.thrust = 1</div>`
    return document.getElementById(constants.canvasId).getContext("2d")
}

function mainLoop(renderer, state, parser, physics){
    parser.parse()
    physics.step(state)
    renderer.render()
}