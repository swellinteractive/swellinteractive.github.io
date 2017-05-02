function IProovConsole(iProov) {
    this.log = function (message) {
        if(iProov.debug) {
            if(window.console) {
                console.trace(message);
            }
        }
    }
}