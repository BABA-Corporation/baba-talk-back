const init = require('./init/init');
const router = require('./routes/router');
const cors = require('cors');
var bodyParser = require('body-parser');

const express = require('express');
const app =  express();

app.use(express.static('public'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use("/",cors(), router);

const port = init.serverPort;
app.set('port', process.env.PORT || port);
app.listen(port, () => {
    
    console.log( "serveur launched, listening on port " + port );
    console.log("environment : " + app.settings.env);
    
});