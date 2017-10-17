"use strict";

const joi = require("joi");

const envObjSchema = joi
  .object({
    PORT: joi.number().integer().min(0).max(65535).required()
  })
  .unknown(false)
  .required();

const envObj = joi.attempt(process.env, envObjSchema);

const config = {
  port: envObj.PORT
};

module.exports = config;
