import Joi from "joi-browser";

const cardSchema = {
  title: Joi.string().min(3).max(30).required().label("Title"),
  subTitle: Joi.string().min(3).max(30).required().label("Subtitle"),
  description: Joi.string().min(3).max(100).required().label("Description"),
  address: Joi.string().min(4).max(30).required().label("Address"),
  phone: Joi.number().required().label("Phone"),
  url: Joi.string()
    .regex(/^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)*$/)
    .required()
    .label("Image url"),
  id: Joi.string().label("ID"),
};

export default cardSchema;
