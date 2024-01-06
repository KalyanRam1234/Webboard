// "use strict";
class User {
    constructor(name, email, password, date, collections) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.date = date;
        this.collections = collections;
    }
}

module.exports = User;
