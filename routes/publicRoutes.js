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
router.post(init.routes.login, (req, res) => {

    let userFromRequest = new User(req.body.email, req.body.password);

    jwt.sign(userFromRequest.toJson(), "secret", { expiresIn:"3h" }, (err, token) => {
                
        if(err){

            console.log("erreur lors de la signature du token : " + err)
            res.status(403).send({"forbidden" : "token expired"});

        }else{

            //récupére l'user correspondant au mail
            database.getUserByMail('users', userFromRequest).then((userFromDatabase) => {

                //vérifie que le password passé en param est le même que le password en BDD
                if(userFromRequest.match(userFromDatabase)){
                    res.status(200).send({"message" : init.message.authent.sucess, "token" : token});
                }else{
                    res.status(403).send({"message" : init.message.authent.failure, error: init.message.authent.wrongUsernameOrPassword});
                }

            }).catch((error) => {

                if(error = 404)
                res.status(error.code).send({"message" : init.message.database.userNotFound})
            })

        }
    });
    
});


/**
 * save user to database
 */
router.post(init.routes.saveUser, (req, res) => {

    let hashedPassword = require("crypto")
    .createHmac("sha256", req.body.password + req.body.email)
    .digest("hex");
    
    let user = new User(req.body.email, hashedPassword);

    //vérifie si l'addresse mail n'existe pas déjà
    database.getUserByMail('users', user).then((result) => {
        
        if(!result){

            database.save('users', user).then((result) => {

                res.status(200).send({message: init.message.database.userSuccessfullySaved, user : result});
        
            }).catch((error) => {
        
                res.status(500).send({message: init.message.database.errorWhileSavingData, error: error});
        
            }) 
        }else{
            res.status(403).send({message: init.message.database.userAlreadyExist})
        }  

    });
});

module.exports = router;