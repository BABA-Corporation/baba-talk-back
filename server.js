const init = require('./init/init');
const router = require('./routes/router');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const express = require('express');
const app =  express();
const figlet = require('figlet');

app.use(init.routes.apiDoc, swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.static('public'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use("/",cors(), router);

const port = init.serverPort;
app.set('port', process.env.PORT || port);
app.listen(port, () => {
    
    figlet(init.ascii.top + init.ascii.body + init.ascii.footer, (err, data)=> {
        if (err) {
            console.log('Who made this ASCII shit... ?');
            console.dir(err);
            return;
        }
        console.log(data)
        console.log( "serveur launched, listening on port " + port );
        console.log("environment : " + app.settings.env);
        console.log("go check API's documention on " + init.routes.apiDoc);
        
    });

    
});