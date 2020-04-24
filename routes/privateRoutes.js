const express = require('express');
const router = express.Router();
const init = require('../init/init.js');
const database = require('../controller/databaseController');
const gnews = require('../controller/gNewsController');
const User = require('../model/User');

let routes = init.routes;

router.post(init.routes.hello, (req, res) => {
    res.send("hello from private")
});

/**
 * renvois tous les articles en rapport avec tous les sujets enregistré par un utilisateur
 */
router.get(routes.user + "/:userId" + routes.articles, async (req, res) => {
   //va cherche l'user avec son id;
    let userFounded = await database.getUserById(req.params.userId);
    if(userFounded){

        //pour chaque topic du user, interroge gnews
        let articles = [];

        for (let i = 0; i < userFounded.topics.length; i++) {
            
            const topic = userFounded.topics[i];
            let article = await gnews.getArticlesByTopic(topic);
            let articlesPerTopic = {};
            articlesPerTopic[topic] = article;
            articles.push(articlesPerTopic);
            
        }

        res.status(200).send(articles);

    }else{
        res.status(404).send({message: init.message.database.userNotFound})
    }
    
});


/**
 * renvois les articles en rapport avec le sujet passé en paramètre
 */
router.get(routes.user + "/:userId" + routes.articles + "/:topic", async (req, res) => {

    let topic = req.params.topic;

    let article = await gnews.getArticlesByTopic(topic);
    let articlesPerTopic = {};
    articlesPerTopic[topic] = article;

    res.status(200).send(articlesPerTopic);
     
});

/**
 * modifie les topics de l'utilisateur passé en paramètre
 */
router.put(routes.user + "/:userId", async (req, res) => {

    let userToUpdate = new User(req.body.email, req.body.topics);

    //vérifie si l'addresse mail n'existe pas déjà
    database.getUserById(req.params.userId).then((result) => {
        
        if(result){

            //set le password en back-end pour ne pas qu'un utilisateur puisse le faire lui-même
            //pas le temps de faire une fonctionalité d'envoi d'email avec confirmation
            let cleanUserToUpdate = {
                email : result.email,
                password : result.password,
                id : result.id,
                topics : req.body.topics
            };

            database.updateUser(req.params.userId, cleanUserToUpdate).then((userSaved) => {

                res.status(200).send({message: init.message.database.userSuccessfullyUpdated, userId : userSaved.id});
        
            }).catch((error) => {
                console.log(error);
                res.status(500).send({message: init.message.database.errorWhileUpdatingUser, error: error});
        
            });
            
        }else{

            res.status(403).send({message: init.message.database.userNotFound})

        }  

    }).catch((error) => {
        console.log(error);
        res.status(500).send({message: init.message.database.errorWhileUpdatingUser, error: error.message});
    })
     
});

module.exports = router;