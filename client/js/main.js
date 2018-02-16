// Kick off the space-lizard experience
(function(){
    // Define the memory object.
    const brain = {}
    // Inject a canvas into the page
    const ctx = initCanvas()
    // Initialise an state object
    const state = initState(brain)
    // Get a renderer, for drawing the state to the canvas
    const renderer = getRenderer(ctx, state)
    // Get the parse
    const parser = getParser(brain)
    // Establish contact with the server and begin accepting state changes
    initNetwork(state)
    // Initiate game update loop at 60 fps
    setInterval(() => mainLoop(renderer, state, parser), 16)
})()

function initCanvas(){
    // Inject the canvas
    document.body.innerHTML += `<canvas id=${constants.canvasId} width=1000 height=800></canvas>`
    // And the scripting box
    document.body.innerHTML += `<div id=${constants.editTextId} contenteditable="true">brain.t = 1; brain.a = 1</div>`
    return document.getElementById(constants.canvasId).getContext("2d")
}

function mainLoop(renderer, state, parser){
    parser.parse()
    renderer.render()
}