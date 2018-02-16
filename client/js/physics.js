function getPhysics(screenDimensions){
    // Boundary conditions
    const pMin = [0.0,0.0]
    const pMax = [1000.0,800.0]
    const fMin = 0.0
    const fMax = Math.PI * 2.0
    const sMax = 10.0
    const thrustMin = 0.0
    const thrustMax = 0.1
    const oLim = 0.1
    const oMin = -oLim
    const oMax = oLim
    const torqueLim = 0.1
    const torqueMin = -torqueLim
    const torqueMax = torqueLim

    // We need five 2D vectors to track completely a ship.
    // We will represent angular movement with a single value, rather than a vector.
    // We will also simplify with dt = 1 (and lock the game speed to the server frame rate)
    // AKA "hand-wavy physics"
    
    const ship = {}
    // Position p. 
    // This is the position of the ship within the game universe.
    ship.p = [500.0,500.0]
    // Facing f
    // This is the direction the ship is facing, from 0 (down) through pi (up), periodic with 2pi=0
    ship.f = 3*Math.PI/2
    // Velocity v
    // Velocity of the ship.
    ship.v = [0.0,0.0]
    // Thrust
    // The acceleration in the direction of facing f. This value is set by the client.
    ship.thrust = 0.0
    // Angular velocity (omega, o)
    // The speed which the ship is rotating clockwise (positive) or anticlockwise (negative). I.e rate of change of facing.
    ship.o = 0.0
    // Torque
    // The rate of change of angular velocity clockwise (positive) or anticlockwise (negative), i.e. how fast the ship's spinning speeds up or slows down. This value is set by the client.
    ship.torque = 0.0

    // Get the unit vector of the ship's direction
    ship.getDirection = function(){
        return [
            Math.sin(ship.f),
            Math.cos(ship.f)
        ]
    }

    // Transform from universe coordinates to screen pixels.
    ship.toPixels = function () {
        return [
            //x
            this.p[0] * screenDimensions[0] / pMax[0],
            //y
            this.p[1] * screenDimensions[1] / pMax[1]
        ]
    }

    // When we leave the right side of the universe, we emerge on the left (same with up/down)
    // Note: the universe is inscribed on a donut.
    function applyPeriodicLimitArray(array2d, lower, upper){
        if(array2d[0] < lower[0]) array2d[0] = upper[0];
        if(array2d[1] < lower[1]) array2d[1] = upper[1];
        if(array2d[0] > upper[0]) array2d[0] = lower[0];
        if(array2d[1] > upper[1]) array2d[1] = lower[1];
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

    function limitOmega(o){
        if(o < oMin) return oMin;
        if(o >= oMax) return oMax;
        return o;
    }

    function limitFacing(f){
        // Periodic, but we will adjust to maintain positivity ^_^
        const f2 = f%fMax
        if(f2<=fMin) return fMax-f2;
        return f2
    }

    function limitVelocity(v){
        // A little more involved, as we want to ensure the magnitude of vector v below sMax
        const speed = Math.sqrt((ship.v[0]*ship.v[0])+(ship.v[1]*ship.v[1]))
        if(speed > sMax){
            // If it is out of bounds we need to scale the vector down to magnitude sMax.
            return [
                v[0] * sMax / speed,
                v[1] * sMax / speed
            ]
        }
        return v
    }

    // Basic Euler integration
    function step(state){
        // Set values from the ship's brain
        ship.torque = limitTorque(state.brain.torque)
        ship.thrust = limitThrust(state.brain.thrust)
        // Apply torque to o
        ship.o = limitOmega(ship.o + ship.torque)
        // Apply omega to facing
        ship.f = limitFacing(ship.f + ship.o)
        // Update velocity, by applying thrust in the ship's direction
        const d = ship.getDirection()
        const acceleration = [ship.thrust * d[0], ship.thrust * d[1]]
        ship.v = limitVelocity([ship.v[0] + acceleration[0], ship.v[1] + acceleration[1]])
        // Update position
        ship.p[0] = ship.p[0] + ship.v[0]
        ship.p[1] = ship.p[1] + ship.v[1]
        applyPeriodicLimitArray(ship.p, pMin, pMax)
    }

    return {
        ship: ship,
        step: step,
    }
}