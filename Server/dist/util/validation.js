"use strict";

const {
  body,
  validationResult,
  buildCheckFunction
} = require("express-validator");
const validateRegistrationBody = () => {
  return [body("userName").trim().exists().withMessage("userName field is required").isLength({
    min: 3
  }).withMessage("name must be greater than 3 letters"), body("email").exists().withMessage("email field is required").isEmail().withMessage("Email is invalid"), body("password").exists().withMessage("password field is required").isLength({
    min: 8,
    max: 12
  }).withMessage("password must be in between 8 to 12 characters long")];
};
const validateLoginBody = () => {
  return [body("email").trim().exists().withMessage("email field is required").isEmail().withMessage("Email is invalid"), body("password").exists().withMessage("password field is required").isLength({
    min: 8,
    max: 12
  }).withMessage("password must be in between 8 to 12 characters long")];
};
const validateContactBody = () => {
  return [body("firstName").trim().exists().withMessage("Firstname field is required").isLength({
    min: 3
  }).withMessage("name must be greater than 3 letters"), body("lastName").trim().exists().withMessage("Lastname field is required").isLength({
    min: 3
  }).withMessage("name must be greater than 3 letters"), body("address").exists().withMessage("Address field is required"), body("email").exists().withMessage("email field is required").isEmail().withMessage("Email is invalid"), body("phone").exists().withMessage("phone field is required"), body("userId").exists().withMessage("Id field is required")];
};
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({
    [err.param]: err.msg
  }));
  return res.status(422).json({
    errors: extractedErrors
  });
};
module.exports = {
  validateRegistrationBody,
  validateLoginBody,
  validateContactBody,
  validate
};