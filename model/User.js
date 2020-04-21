class User {
  
  constructor(email, password, topics) {

    let hashedPassword = require("crypto")
    .createHmac("sha256", email + password)
    .digest("hex");

    this.email = email;
    this.password = hashedPassword;
    this.id = this.generateUuId();
    this.topics = topics
  }
  
  getUser(){
    return this;
  }

  /**
   * @return user in json format
   */
  toJson(){
    return {
      email: this.email,
      password: this.password,
      id: this.id,
      topics: this.topics
    }
  }

  /**
   * @param {User in json} userFromDatabase 
   * @return boolean
   */
  match(userFromDatabase){

    return this.password == userFromDatabase.password;

  }

  generateUuId () {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
        });
    return uuid;
  }  
  

}

module.exports = User;