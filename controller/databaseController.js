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
    
            // As an admin, the app has access to read and write all data, regardless of Security Rules
            let db = admin.database();
            let collection = 'users';

            db.ref(collection).push(user)
            .then(
                res => resolve(user),
                err => reject(err)
            )

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
                
                if(snapshot.val()){

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
