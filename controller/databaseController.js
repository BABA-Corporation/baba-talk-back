const admin = require('firebase-admin');
const serviceAccount = require("../init/open-innov-1c9f6-firebase-adminsdk-l8vg2-a6b656e3e5.json");


// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://open-innov-1c9f6.firebaseio.com"
});

module.exports = {

    saveUser: (user) => {

        return new Promise((resolve, reject) => {
    
            admin.database().ref('users/' + user.id).set(user).then((result) => {
                resolve(result);
            }).catch((error) => {
                reject(error);
            })
            
        })

    },

    updateUser: (userId, userToUpdate) => {

        return new Promise((resolve, reject) => {

        admin.database().ref('users/' + userId).set(userToUpdate, (error) => {
                if (error) {
                    reject(error)
                } else {
                    resolve('ok');
                }
            });
        })
            
    },

    getUserById: (userId) => {
        return new Promise((resolve, reject) => {
            let collection = 'users';
            let rootRef = admin.database().ref();
            let query = rootRef.child(collection).orderByChild('id').equalTo(userId);

            query.on('value', snapshot => {
                if(snapshot.val()){
                    let foundUser = snapshot.val();
                    let foundUserDocumentId = Object.keys(foundUser);

                    let userEmail = foundUser[foundUserDocumentId].email
                    let userPassword = foundUser[foundUserDocumentId].password
                    let id = foundUser[foundUserDocumentId].id;
                    let topics = foundUser[foundUserDocumentId].topics;

                    let parsedFoundUser = {
                        email: userEmail,
                        password: userPassword,
                        id: id,
                        topics: topics
                    }
                    resolve(parsedFoundUser);
                }else{
                    resolve(null);
                }
                
            })
        })
    },

    /**
     * research user with his email
     */
    getUserByMail: (user) => {
        return new Promise((resolve, reject) => {
            let collection = 'users';
            let rootRef = admin.database().ref();
            let query = rootRef.child(collection).orderByChild('email').equalTo(user.email);
            query.on('value', snapshot => {
                
                if(snapshot.exists()){

                    let foundUser = snapshot.val();
                    let foundUserDocumentId = Object.keys(foundUser);

                    let userEmail = foundUser[foundUserDocumentId].email
                    let userPassword = foundUser[foundUserDocumentId].password
                    let id = foundUser[foundUserDocumentId].id;

                    let parsedFoundUser = {
                        email: userEmail,
                        password: userPassword,
                        id: id
                    }

                    resolve(parsedFoundUser);

                }else{
                    resolve(null);
                }
                
            })
        })        
    }

}
