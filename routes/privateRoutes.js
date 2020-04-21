const express = require('express');
const router = express.Router();
const init = require('../init/init.js');
const database = require('../controller/databaseController');
const axios = require('axios');

let routes = init.routes;

router.post(init.routes.hello, (req, res) => {
    res.send("hello from private")
});

router.get(routes.user + "/:userId" + routes.articles, async (req, res) => {
   //va cherche l'user avec son id;
    let userFounded = await database.getUserById(req.params.userId);
    if(userFounded){

        //pour chaque topic du user, interroge gnews
        let userTopics = userFounded.topics;
        userTopics.forEach(async topic => {

            let params = {
                params: {
                    q: topic,
                    apiKey: init.gnewsApi.key
                }
            }
            let gNewsEndPoint = init.gnewsApi.topHeadLineEndPoint;
            axios.get(gNewsEndPoint, params).then(
                res => console.log(res),
                err => console.log(err)
            )

        });
        //renvois les news trouvés par google

    }else{
        res.status(404).send({message: init.message.database.userNotFound})
    }
    

})

module.exports = router;