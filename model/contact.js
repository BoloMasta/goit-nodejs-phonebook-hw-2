const Joi = require("joi");
const JoiPhoneValidate = Joi.extend(require("joi-phone-number"));
const mongoose = require("mongoose");

const Shema = mongoose.Schema;

const contactSchema = new Shema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const Contact = mongoose.model("Contact", contactSchema);

const validator = (schema) => (payload) => schema.validate(payload, { abortEarly: false });

const contactCreateValidationShema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: JoiPhoneValidate.string()
    .phoneNumber({ defaultCountry: "PL", format: "international" })
    .required(),
  favorite: Joi.boolean(),
});

const contactUpdateValidationShema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  phone: JoiPhoneValidate.string().phoneNumber({
    defaultCountry: "PL",
    format: "international",
  }),
  favorite: Joi.boolean(),
}).min(1);

const validateCreateContact = validator(contactCreateValidationShema);
const validateUpdateContact = validator(contactUpdateValidationShema);

module.exports = {
  Contact,
  validateCreateContact,
  validateUpdateContact,
};
