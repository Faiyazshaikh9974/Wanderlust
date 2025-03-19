const Joi = require("joi");

//If the Information is not Give as per Schema then it will throw an error..
module.exports.listingValidateSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    price: Joi.number().min(0).required(),
    country: Joi.string().regex(/^[A-Za-z\s]+$/) // Only letters & spaces allowed
    .trim()
    .required()
    .strict(),
    image: Joi.object({
      filename: Joi.string(),
      url: Joi.string().required()
    }).required() // Ensuring the `image` object itself is required
  }).required() // Ensuring the `listing` object itself is required
});

//review Validation Schema
module.exports.reviewValidateSchema = Joi.object({
  ratting: Joi.string()
  .valid('1', '2', '3', '4', '5') // Restrict to valid rating values
  .required(),

comment: Joi.string()
  .max(255) // Limit comment length (optional)
  .required()
});





