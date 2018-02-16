function getRenderer(ctx, state, physics){
    function render(){
        // console.log(state.state)
        ctx.fillStyle = constants.spaceColor
        ctx.fillRect(0,0,constants.canvasDimensions[0], constants.canvasDimensions[1])

        // If state.latest is null, we do not have any data yet, so render the placeholder
        if(state.latest === null){
            drawThrusters(ctx, physics)
            drawShip(ctx, physics)
        }
    }

    function drawShip(ctx, ship){
        const pix = physics.ship.toPixels()
        const v = physics.ship.getDirection()
        const vp = [v[1], v[0]]
        const scale = 15
        // Lets start with a line in the ship's facing direction
        ctx.strokeStyle = constants.shipColor
        ctx.fillStyle = "#222222"
        ctx.lineWidth = 1
        ctx.beginPath()
        // We will start just behind the ship's centre
        ctx.moveTo(pix[0] - (v[0] * scale), pix[1] - (v[1] * scale))
        // drawing a line perpendiclar to the facing
        ctx.lineTo(pix[0] - (vp[0] * scale), pix[1] - (vp[1] * scale))
        // And move to draw to just in front
        ctx.lineTo(pix[0] + (v[0] * scale * 3), pix[1] + (v[1] * scale * 3))
        // Another perpendicular
        ctx.lineTo(pix[0] + (vp[0] * scale), pix[1] + (vp[1] * scale))
        // back to the start
        // ctx.lineTo(pix[0] - (v[0] * scale), pix[1] - (v[1] * scale))
        ctx.closePath()
        ctx.fill()
        ctx.stroke()
    }

    function drawThrusters(ctx, ship){
        const pix = physics.ship.toPixels()
        const scale = 15
        const v = physics.ship.getDirection()
        // If we have some thrust, draw a line for the thruster
        if(physics.ship.thrust > 0){
            ctx.beginPath()
            ctx.moveTo(pix[0], pix[1])
            ctx.lineTo(pix[0] + (-v[0] * scale*2), pix[1] + (-v[1] * scale*2))
            ctx.strokeStyle = "#ee1111"
            ctx.lineWidth = 10
            ctx.stroke()
        }
    }

    return {
        render: render
    }
}