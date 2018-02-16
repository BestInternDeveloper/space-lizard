function getParser(brain){
    return {
        parse: function(){
            let script = document.getElementById(constants.editTextId).innerHTML
            console.log(script)

            console.log("before " + brain.thrust + brain.torque)
            eval(script)
            console.log("after " + brain.thrust + brain.torque)
        }
    }
}