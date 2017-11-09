'use strict'

const { expect } = require('chai')
const _ = require('lodash')
const db = require('../db')
const User = require('../user')

describe('User >', () => {
  let id,
    user

  beforeEach(async () => {
    id = _.random(1000)

    user = {
      id,
      login: 'dev',
      avatar_url: 'https://dev.com/a.png',
      html_url: 'https://github.com/dev',
      type: 'User'
    }
  })

  afterEach(async () => {
    await db(User.tableName)
      .where({ id })
      .del()
  })

  describe('insert >', () => {
    it('should insert a new user', async () => {
      const userInserted = await User.insert(user)
      const userinDb = await db(User.tableName).where({id}).first()

      expect(userinDb).to.eql(user)
      expect(userInserted).to.eql(user)
    })

    it('should validate the input params', async () => {
      delete user.login

      try {
        await User.insert(user)
      } catch (err) {
        expect(err.name).to.be.eql('ValidationError')
      }
    })
  })

  describe('read', () => {

  })
})
