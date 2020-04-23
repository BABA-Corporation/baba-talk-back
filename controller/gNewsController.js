const axios = require('axios');
const init = require('../init/init');


module.exports = {

    /**
     * renvois les news en rapport avec le topic passé en paramètre 
     */
    getArticlesByTopic: async (topic) => {

        let params = {
            params: {
                q: topic,
                apiKey: init.gnewsApi.key
            }
        }
        let gNewsEndPoint = init.gnewsApi.everythingEndPoint;

        try {
            const response = await axios.get(gNewsEndPoint, params);
            return response.data.articles;

        } catch (error) {
            console.log("erreur lors de la requête à l'API Gnews : " + error);
            return error;
        }
        
    }
}