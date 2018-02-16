function getRenderer(ctx, state, physics){
    function render(){
        // console.log(state.state)
        ctx.fillStyle = constants.spaceColor
        ctx.fillRect(0,0,constants.canvasDimensions[0], constants.canvasDimensions[1])

        // If state.latest is null, we do not have any data yet, so render the placeholder
        if(state.latest === null){
            drawCircle(ctx, physics)
        }

    }

    function drawCircle(ctx, physics){
        const pix = physics.ship.toPixels()
        const radius = 15
        ctx.imageSmoothingEnabled = false
        ctx.beginPath()
        ctx.arc(pix[0],pix[1],radius,0,2*Math.PI, false)
        ctx.fillStyle = constants.shipColor
        ctx.fill()
        ctx.lineWidth = 1
        ctx.strokeStyle = "#111111"
        ctx.stroke()
        // Draw a line in the ship's facing
        ctx.beginPath()
        ctx.moveTo(pix[0], pix[1])
        const v = physics.ship.getDirection()
        ctx.lineTo(pix[0] + (v[0] * radius), pix[1] + (v[1] * radius))
        ctx.stroke()
    }

    return {
        render: render
    }
}