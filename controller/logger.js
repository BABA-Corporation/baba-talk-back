let logger = {
    info: (message, exchange, pair, timeframe) => {

        let content = "";

        if(exchange != undefined && pair != undefined && timeframe != undefined){
            content = "exchange : " + exchange + " pair : " + pair + " timeframe : " + timeframe;

        }
        console.log(new Date().toUTCString() + "[INFO] - "  + content + " - " +  message);
    },
    error: (message, exchange, pair, timeframe) => {
        let content = "";

        if(exchange != undefined && pair != undefined && timeframe != undefined){
            content = "exchange : " + exchange + " pair : " + pair + " timeframe : " + timeframe;

        }
        console.error(new Date().toUTCString() + "[ERROR] - "  + content + " - " +  message);
    }
}

module.exports = logger;