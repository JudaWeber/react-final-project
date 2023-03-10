import Joi from "joi-browser";

const registerschema = {
  name: Joi.string().min(6).max(30).required().label("Name"),
  email: Joi.string().email().min(6).max(30).required().label("Email"),
  password: Joi.string().min(6).max(30).required().label("Password"),
};

export default registerschema;
