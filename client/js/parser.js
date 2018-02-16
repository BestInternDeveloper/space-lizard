// NOTE Y'ALL!
// Anything we bring in scope here is complete open to being screwed with via the UI!!!!
function getParser(brain){
    return {
        parse: function(vars){
            let script = document.getElementById(constants.editTextId).value
            try{
                eval(script)
            } catch (e){
                // why worry?
            }
        }
    }
}