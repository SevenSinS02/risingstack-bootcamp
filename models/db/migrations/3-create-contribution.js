'use strict'

const tableName = 'contribution'

function up(knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.integer('user').notNullable()
    table.foreign('user').references('user.id').onDelete('CASCADE')
    table.integer('repository').notNullable()
    table.foreign('repository').references('repository.id').onDelete('CASCADE')
    table.primary(['user', 'repository'])
    table.integer('line_count').unsigned().notNullable()
  })
}

function down(knex) {
  return knex.schema.dropTableIfExists(tableName)
}

module.exports = {
  up,
  down
}
