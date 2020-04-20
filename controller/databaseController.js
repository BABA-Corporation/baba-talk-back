const admin = require('firebase-admin');
const serviceAccount = require("../init/open-innov-1c9f6-firebase-adminsdk-l8vg2-a6b656e3e5.json");
const firebase = require('firebase');
const init = require('../init/init');


// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://open-innov-1c9f6.firebaseio.com"
});

module.exports = {

    save: (collection, dataToSave) => {

        return new Promise((resolve, reject) => {
    
            // As an admin, the app has access to read and write all data, regardless of Security Rules
            let db = admin.database();
            db.ref(collection).push(dataToSave)
            .then(
                res => resolve(res),
                err => reject(err)
            )

        })

    },

    /**
     * research user with his email
     */
    get: (collection, user) => {
        return new Promise((resolve, reject) => {

            let rootRef = admin.database().ref();
            let query = rootRef.child(collection).orderByChild('email').equalTo(user.email);
            query.on('value', snapshot => {
                
                if(snapshot.val()){

                    let foundUser = snapshot.val();
                    let foundUserDocumentId = Object.keys(foundUser);

                    let userEmail = foundUser[foundUserDocumentId].email
                    let userPassword = foundUser[foundUserDocumentId].password

                    let parsedFoundUser = {
                        email: userEmail,
                        password: userPassword
                    }

                    resolve(parsedFoundUser);

                }else{

                    let error = init.message.database.userNotFound;
                    reject(error);
                }
                
            })
        })        
    }

}
