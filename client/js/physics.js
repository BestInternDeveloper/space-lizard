function getPhysics(screenDimensions){
    // Boundary conditions
    const pMin = [0.0,0.0]
    const pMax = [1000.0,800.0]
    const fMin = 0.0
    const fMax = Math.PI * 2.0
    const sMin = 0.0
    const sMax = 10.0
    const thrustMin = 0.0
    const thrustMax = 0.1
    const oLim = 1.0
    const oMin = -oLim
    const oMax = oLim
    const torqueLim = 0.1
    const torqueMin = -torqueLim
    const torqueMax = torqueLim

    // We need five 2D vectors to track completely a ship.
    // We will represent angular movement with a single value, rather than a vector.
    // We will also simplify with dt = 1 (and lock the game speed to the server frame rate)
    
    const ship = {}
    // Position p. 
    // This is the position of the ship within the game universe.
    ship.p = [500.0,500.0]
    // Facing f
    // This is the direction the ship is facing, from 0 (up) through pi (down), periodic with 2pi=0
    ship.f = 0.0
    // Speed s
    // The speed of the ship in the direction of facing f
    ship.s = 0.0
    // Thrust
    // The acceleration in the direction of facing f. This value is set by the client.
    ship.thrust = 0.0
    // Angular velocity (omega, o)
    // The speed which the ship is rotating clockwise (positive) or anticlockwise (negative). I.e rate of change of facing.
    ship.o = 0.0
    // Torque
    // The rate of change of angular velocity clockwise (positive) or anticlockwise (negative), i.e. how fast the ship's spinning speeds up or slows down. This value is set by the client.
    ship.torque = 0.0

    // Transform from universe coordinates to screen pixels.
    ship.toPixels = function () {
        return [
            //x
            this.p[0] * screenDimensions[0] / pMax[0],
            //y
            this.p[1] * screenDimensions[1] / pMax[1]
        ]
    }

    // Apply boundary conditions
    ship.limit = function(){
        applyPeriodicLimitArray(ship.p, pMin, pMax)
        // Periodic facing conditions so we spin naturally. we ignore any overshoot - as long as we limit omega this should not be noticeable.
        if(ship.f < fMin) ship.f = fMax;
        if(ship.f >= fMax) ship.f = fMin;
        // Hard limits on all other values
        if(ship.s < sMin) ship.s = sMin;
        if(ship.s >= sMax) ship.s = sMax;
        ship.thrust = limitThrust(ship.thrust)
        if(ship.o < oMin) ship.o = oMin;
        if(ship.o >= oMax) ship.o = oMax;
        ship.torque = limitTorque(ship.torque)
    }

    // When we leave the right side of the universe, we emerge on the left (same with up/down)
    // Note: the universe is inscribed on a donut.
    function applyPeriodicLimitArray(array2d, lower, upper){
        if(array2d[0] < lower[0]) array2d[0] = upper[0];
        if(array2d[1] < lower[1]) array2d[1] = upper[1];
        if(array2d[0] >= upper[0]) array2d[0] = lower[0];
        if(array2d[1] >= upper[1]) array2d[1] = lower[1];
    }

    function limitTorque(t){
        if(t < torqueMin) return torqueMin;
        if(t >= torqueMax) return torqueMax;
        return t;
    }

    function limitThrust(t){
        if(t < thrustMin) return thrustMin;
        if(t >= thrustMax) return thrustMax;
        return t;
    }

    // Basic Euler integration
    function step(state){
        // Set values from the ship's brain
        ship.torque = limitTorque(state.brain.torque)
        ship.thrust = limitThrust(state.brain.thrust)
        // Update speed
        ship.s = ship.s + ship.thrust
        // Update position
        ship.p[0] = ship.p[0] + ship.s
        ship.p[1] = ship.p[1] + ship.s
        ship.limit()
    }

    return {
        ship: ship,
        step: step,
    }
}