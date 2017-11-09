'use strict'

const fp = require('lodash/fp')
const db = require('../db')
const joi = require('joi')

const tableName = 'user'

const insertSchema = joi.object({
  id: joi.number().integer().required(),
  login: joi.string().required(),
  avatar_url: joi.string().required(),
  html_url: joi.string().uri().required(),
  type: joi.string().required()
}).required()

async function insert(params) {
  const user = joi.attempt(params, insertSchema)

  return db(tableName)
    .returning('*')
    .insert(user)
    .then(fp.head)
}

const readSchema = joi.object({
  id: joi.number().integer().required(),
  login: joi.string().required()
}).xor('id', 'login')
  .required()

async function read(params) {
  const selection = joi.attempt(params, readSchema)

  return db(tableName)
    .first(selection)
}

module.exports = {
  tableName,
  insert,
  read
}
