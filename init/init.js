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
            userNotFound: "no user found with this user and password"
        }
    },
    
}