
class User {
  constructor(email, password) {
    this.email = email;
    this.password = password;
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
      password: this.password
    }
  }

  /**
   * @param {User in json} userFromDatabase 
   * @return boolean
   */
  match(userFromDatabase){

    return this.password == userFromDatabase.password;

  }

}

module.exports = User;