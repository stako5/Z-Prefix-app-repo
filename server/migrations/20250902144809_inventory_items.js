/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('users', (tables) =>{
    tables.increments('id').primary();
    tables.string('username').notNullable();
    tables.string('password').notNullable();
  })

  await knex.schema.createTable('items', (tables) =>{
    tables.increments('item_id').primary();
    tables.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
    tables.string('item_name').notNullable();
    tables.string('description').notNullable();
    tables.string('quantity').notNullable()
    
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('items');
    await knex.schema.dropTableIfExists('users');
};
