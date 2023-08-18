const {
  getShemaWithLimitOffset,
  getSchemaWithWhereCondition,
  addSchemaRow,
  updateSchemaRow,
  deleteSchemaRow,
} = require("../services/mysql.service");

class User {
  constructor(field) {
    this.id = field.id;
    this.name = field.name;
    this.email = field.email;
    this.role = field.role;
    this.password = field.password;
    this.createdAt = field.createdAt;
    this.updatedAt = field.updatedAt;
  }
  getId() {
    return this.id;
  }
  prepareToCreate() {
    return {
      name: this.name,
      email: this.email,
      role: this.role,
      password: this.password,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
  prepareToUpdate() {
    return {
      name: this.name,
      email: this.email,
      role: this.role,
      password: this.password,
      createdAt: this.createdAt,
      updatedAt: new Date(),
    };
  }
  async create() {
    return await addSchemaRow("users", this.prepareToCreate());
  }
  async update() {
    return await updateSchemaRow("users", this.prepareToUpdate(), this.id);
  }
  async all() {
    const rows = await getShemaWithLimitOffset("users", 100, 0);
    const rowsUsers = rows.map((row) => new Users(row));
    return rowsUsers;
  }
  async findById() {
    const rows = await getSchemaWithWhereCondition("users", "id", this.id);
    const rowsUsers = rows.map((row) => new User(row));
    return rowsUsers;
  }
  async delete() {
    return await deleteSchemaRow("users", this.id);
  }
}

module.exports = {
  User,
};
