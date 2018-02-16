function getParser(brain){
    return {
        parse: function(){
            let script = document.getElementById(constants.editTextId).value
            // console.log(script)

            // console.log("before " + brain.thrust + brain.torque)
            eval(script)
            // console.log("after " + brain.thrust + brain.torque)
        }
    }
}