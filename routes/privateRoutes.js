const express = require('express');
const router = express.Router();
const init = require('../init/init.js');
const database = require('../controller/databaseController');
const gnews = require('../controller/gNewsController');

let routes = init.routes;

router.post(init.routes.hello, (req, res) => {
    res.send("hello from private")
});

/**
 * renvois tous les articles enregistré par un utilisateur
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
            articles.push(article);
        }

        res.status(200).send(articles);

    }else{
        res.status(404).send({message: init.message.database.userNotFound})
    }
    

})

module.exports = router;