const Joi = require('joi');

const userSchema = Joi.object({ 
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30).required(),
    role: Joi.string().max(2).min(2).required()
});

const userSchemaUpdate = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30).required(),
    role: Joi.string().max(2).min(2).required(),
    createdAt : Joi.string().required(),
    updatedAt : Joi.string().required()
})

module.exports = {
    userSchema,
    userSchemaUpdate
};