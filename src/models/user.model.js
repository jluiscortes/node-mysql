const {formatISODateToReadable} = require('../utils/date')
class User {
    constructor(field) {  
        this.id = field.id;
        this.name = field.name;
        this.email = field.email;
        this.role = field.role;
        this.password = field.password;
        this.createdAt = formatISODateToReadable(field.createdAt);
        this.updatedAt = formatISODateToReadable(field.updatedAt);
    }
}

module.exports = User