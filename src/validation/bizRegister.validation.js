import Joi from "joi-browser";

const bizRegisterSchema = {
  name: Joi.string().min(3).max(30).required().label("Name"),
  email: Joi.string().email().min(6).max(30).required().label("Email"),
  password: Joi.string().min(6).max(30).required().label("Password"),
  bizInput: Joi.required(),
};

export default bizRegisterSchema;
