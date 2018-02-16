function getParser(brain){
    return {
        parse: function(){
            let script = document.getElementById(constants.editTextId).innerHTML
            console.log(script)

            console.log("before " + brain.a + brain.t)
            eval(script)
            console.log("after " + brain.a + brain.t)
        }
    }
}