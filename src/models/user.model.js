const {formatISODateToReadable} = require('../utils/date')
class Users {
    constructor(field) {  
        this.id = field.id || null ;
        this.name = field.name;
        this.email = field.email;
        this.role = field.role;
        this.password = field.password;
        this.createdAt = field.createdAt;
        this.updatedAt = field.updatedAt;
    }
}
class User{
    constructor(field) {  
        this.id = field.id || null ;
        this.name = field.name;
        this.email = field.email;
        this.role = field.role;
        this.password = field.password;
        this.createdAt = field.createdAt;
        this.updatedAt = field.updatedAt;
    }
    getId(){
        return this.id;
    }
    prepareToCreate(){
        return {
            name: this.name,
            email: this.email,
            role: this.role,
            password: this.password,
            createdAt : new Date(),
            updatedAt : new Date()
        }
    }
    prepareToUpdate(){
        return {
            name: this.name,
            email: this.email,
            role: this.role,
            password: this.password,
            createdAt :this.createdAt,
            updatedAt : new Date()
        }
    }
}

module.exports = {
    User,
    Users
}