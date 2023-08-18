const { userSchema, userSchemaUpdate } = require("../schemas/user.schema");
const Message = require("../models/message.model");
const { User } = require("../models/user.model");
const createError = require("http-errors");

async function getUsers(req, res, next) {
  try {
    const rowsUsers = await new User({}).all();
    return new Message(
      200,
      "Operation successfully completed.",
      rowsUsers
    ).send(res);
  } catch (error) {
    console.log(error);
    next(createError.InternalServerError(error.message));
  }
}
async function findUserById(req, res, next) {
  try {
    if (!req.params.id)
      return new Message(400, "Id is required.", []).send(res);
    const { id } = req.params;
    const rowsUsers = await new User({ id }).findById();
    return new Message(
      200,
      "Operation successfully completed.",
      rowsUsers
    ).send(res);
  } catch (error) {
    next(createError.InternalServerError(error.message));
  }
}
async function addUser(req, res, next) {
  try {
    const { error, value } = await userSchema.validate(req.body);
    if (error) return new Message(400, error.message, []).send(res);
    const { affectedRows } = await new User(value).create();
    if (!affectedRows) {
      return new Message(400, "User not added.", []).send(res);
    }
    return new Message(200, "User added successfully.", []).send(res);
  } catch (error) {
    console.log({ error });
    next(createError.InternalServerError(error.message));
  }
}
async function updateUser(req, res, next) {
  try {
    const { id } = req.params;
    if (!id) return new Message(400, "Id is required.", []).send(res);
    const { error, value } = await userSchemaUpdate.validate(req.body);
    if (error) return new Message(400, error.message, []).send(res);
    const { affectedRows } = await new User({ ...value, id }).update();
    if (!affectedRows) {
      return new Message(400, "User not updated.", []).send(res);
    }
    return new Message(200, "User added successfully.", []).send(res);
  } catch (error) {
    console.log({ error });
    next(createError.InternalServerError(error.message));
  }
}
async function deleteUser(req, res, next) {
  try {
    const { id } = req.params;
    if (!id) return new Message(400, "Id is required.", []).send(res);
    const { affectedRows } = await new User({ id }).delete();
    if (!affectedRows) {
      return new Message(400, "User not deleted.", []).send(res);
    }
    return new Message(200, "User deleted successfully.", []).send(res);
  } catch (error) {
    console.log({
      error,
    });
    next(createError.InternalServerError(error.message));
  }
}

module.exports = {
  getUsers,
  findUserById,
  addUser,
  updateUser,
  deleteUser,
};
