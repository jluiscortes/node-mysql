class User {
    constructor(id, name, email, password, role, createdAt, updatedAt) {  
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.password = password;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

module.exports = User