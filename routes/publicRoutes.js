const express = require('express');
const router = express.Router();
const init = require('../init/init.js');
const jwt = require('jsonwebtoken');
const database = require('../controller/databaseController');
const User = require('../model/User');

/**
 * permet de vérifier si l'api répond
 */
router.get(init.routes.hello, (req, res) => {

    res.send("hello");
});

/**
 * login route : create jsonwebtoken 
 * and return it if authentication success
 * @return JSONWebtoken
 */
router.get(init.routes.login, (req, res) => {

    let userFromRequest = new User(req.query.email, req.query.password);

    jwt.sign(userFromRequest.toJson(), "secret", { expiresIn:"3h" }, (err, token) => {
                
        if(err){

            console.log("erreur lors de la signature du token : " + err)
            res.status(403).send({"forbidden" : "token expired"});

        }else{

            //récupére l'user correspondant au mail
            database.get('users', userFromRequest).then((userFromDatabase) => {

                //vérifie que le password passé en param est le même que le password en BDD
                if(userFromRequest.match(userFromDatabase)){
                    res.status(200).send({"message" : init.message.authent.sucess, "token" : token});
                }else{
                    res.status(403).send({"message" : init.message.authent.failure, error: init.message.authent.wrongUsernameOrPassword});
                }
            }).catch((error) => {
                res.status(404).send({"message" : init.message.authent.failure + " , " + error})
            })

        }
    });
    
});


/**
 * save user to database
 */
router.post(init.routes.saveUser, (req, res) => {
        
    let hashedPassword = require("crypto")
    .createHmac("sha256", req.query.password)
    .digest("hex");
    
    let user = new User(req.query.email, hashedPassword);

    database.save('users', user).then((result) => {

        res.status(200).send({"utilisateur enregistré avec succès" : result});

    }).catch((error) => {

        res.status(500).send({message: "erreur lors de l'enregistrement de l'utilisateur", error: error});

    })

});

module.exports = router;