module.exports = {
    serverPort: 3000,
    routes : {
        hello : "/hello",
        login : "/login",   
        saveUser: "/register",
    },
    message : {
        authent:{
            sucess: "authentification success :)",
            failure: "authentification failed :(",
            wrongUsernameOrPassword: "utilisateur ou mot de passe inconnue"
        },
        database: {
            userSuccessfullySaved: "utilisateur enregistré avec succès",
            userNotFound: "no user found with this user and password",
            userAlreadyExist: "this mail address already exist in database",
            errorWhileSavingData: "erreur lors de l'enregistrement en base de donnée"
        }
    },
    
}