function getRenderer(ctx, state){
    function render(){
        console.log(state.state)

        // If state.latest is null, we do not have any data yet, so render the placeholder
        if(state.latest === null){
            drawCircle(ctx)
        }

    }

    function drawCircle(ctx){
        ctx.imageSmoothingEnabled = false
        ctx.beginPath()
        ctx.arc(100,100,20,0,2*Math.PI, false)
        ctx.fillStyle = "#111111"
        ctx.fill()
        ctx.lineWidth = 5
        ctx.strokeStyle = "#111111"
        ctx.stroke()
    }

    return {
        render: render
    }
}