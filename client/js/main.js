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
    wrap = (tag, s) => `<${tag}>${s}</${tag}>`
    div = s => wrap("div", s)
    span = s => wrap("span", s)

    // Inject the canvas
    const theCanvas =  `<canvas id=${constants.canvasId} width=${constants.canvasDimensions[0]} height=${constants.canvasDimensions[1]}></canvas>`
    // And the scripting box
    const theTextArea = `<textarea id=${constants.editTextId} rows="50" cols="100"}>${constants.initScript}</textarea>`
    document.body.innerHTML += div(span(theCanvas) + span(theTextArea))
    return document.getElementById(constants.canvasId).getContext("2d")
}

function mainLoop(renderer, state, parser, physics){
    parser.parse(getUserVars(state, physics))
    physics.step(state)
    renderer.render()
}

function getUserVars(state, physics){
    // Construct some vars to make available to user scripts
    // Don't return any pointers to internal things here! users will be able to mess with them!
    return {
        ship: JSON.parse(JSON.stringify(physics.ship))
    }
}