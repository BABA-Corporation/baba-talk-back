module.exports = {
    serverPort: 3000,
    gnewsApi: {
        key: "1f229736b16047d9bd6a9ed1447bb200",
        topHeadLineEndPoint: "https://newsapi.org/v2/top-headlines",
        everythingEndPoint: "https://newsapi.org/v2/everything"
    },
    routes : {
        hello : "/hello",
        login : "/login",   
        user: "/user",
        articles: "/articles"
    },
    message : {
        authent:{
            sucess: "authentification success :)",
            failure: "authentification failed :(",
            wrongUsernameOrPassword: "utilisateur ou mot de passe inconnue"
        },
        database: {
            userSuccessfullySaved: "utilisateur enregistré avec succès",
            userNotFound: "no user found",
            userAlreadyExist: "this mail address already exist in database",
            errorWhileSavingData: "erreur lors de l'enregistrement en base de donnée"
        }
    },
    
}