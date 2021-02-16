let UserModel = require('../model/UserSchema');
let init = require('../init/init');
let mongoose = require('mongoose');
const logger = require("./logger");

module.exports = {

    connect : () => {

        return new Promise((resolve, reject) => {
    
          mongoose.Promise = global.Promise;    
    
          mongoose.connect(init.database.url, { useNewUrlParser: true, useUnifiedTopology: true })
          .then(() =>{
            logger.info("[databaseController][connect] - connected to database")
            resolve("connected to database");
          })
          .catch((error) => {
            logger.error("[databaseController][connect]" + error)
            reject();
          })
        })
    },

    saveUser: (user) => {

        return new Promise((resolve, reject) => {
            
            UserModel.create(user).then((user) => {
                resolve(user);
            }).catch((error) => {
                reject(error);
            });
            
        })

    },

    updateUser: (userId, userToUpdate) => {

        return new Promise((resolve, reject) => {

            UserModel.findByIdAndUpdate(userId, userToUpdate).then((result) => {
                resolve(result);
            }).catch((error) => {
                reject(error);
            })
        })
            
    },

    getUserById: (userId) => {
        return new Promise((resolve, reject) => {

            if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
                reject({code: 400, message : "incorrect id"});
            }else{

                UserModel.findById(userId).then((user) => {
                    resolve(user);
                }).catch((error) => {
                    reject({code: 500, message : error});
                })
            }
        })
    },

    /**
     * research user with his email
     */
    getUserByMail: (user) => {
        return new Promise((resolve, reject) => {

            UserModel.find({email:user.email}).then((result) => {
                if(result.length > 1){
                    logger.error("[databaseController][getUserByMail] - 2 user found with same email")
                    reject("2 user found with same email")
                }
                resolve(result[0]);
            }).catch((error) => {
                reject(error);
            })

        })        
    }

}
