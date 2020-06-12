module.exports = {
    serverPort: 5000,
    ascii: {
        top: "//////////",
        body: " BABA-TALK-API ",
        footer: "\\\\\\\\\\\\\\\\\\\\"
    },
    gnewsApi: {
        key: "1f229736b16047d9bd6a9ed1447bb200",
        topHeadLineEndPoint: "https://newsapi.org/v2/top-headlines?language=fr",
        everythingEndPoint: "https://newsapi.org/v2/everything?language=fr"
    },
    routes : {
        hello : "/hello",
        login : "/login",   
        user: "/user",
        articles: "/articles",
        apiDoc : "/api-doc"
    },
    message : {
        authent:{
            sucess: "authentification success :)",
            failure: "authentification failed :(",
            wrongUsernameOrPassword: "utilisateur ou mot de passe inconnue"
        },
        database: {
            userSuccessfullySaved: "utilisateur enregistré avec succès",
            userSuccessfullyUpdated: "utilisateur modifié avec succès",
            userNotFound: "no user found",
            userAlreadyExist: "this mail address already exist in database",
            errorWhileSavingUser: "erreur lors de l'enregistrement en base de donnée",
            errorWhileUpdatingUser: "erreur lors de l'update en base de donnée"
        }
    },
    
}