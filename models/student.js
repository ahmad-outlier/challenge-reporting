
const knex = require('../db')

module.exports = {
  findById
}

async function findById (id) {
  if (!id) return false

  const records = await knex('students').select('*').where({ id })
  return records.length ? records[0] : null
}
