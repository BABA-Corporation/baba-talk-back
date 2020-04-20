const jwt = require('jsonwebtoken');
module.exports = {

    /**
     * verify the token sent by client
     */
    tokenExtractor : (req, res, next) => {
        console.log("extracting token...");
        
        let bearerHeader = req.headers['authorization'];

        if(typeof bearerHeader != 'undefined'){

            //extract token value
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];

            //set the token
            req.token = bearerToken;

            next();

        }else{
            res.sendStatus(403);
        }

    },

    tokenVerifyer : (req, res, next) => {
        console.log("verifying token...");
       //TODO mettre le secret avec le hash du certificat let's encrypt
        jwt.verify(req.token, 'secret', (err, authData) => {
            if(err){
                res.status(403).send(err.message);
                console.log(err);
            }else{
                next();
            }
        });

    }
}
