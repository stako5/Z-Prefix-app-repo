/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {id: 1, username: 'stako6', password: '1qaz2wsx'},
    {id: 2, username: 'U001', password: '1qaz2wsx'},
    {id: 3, username: 'U002', password: '1qaz2wsx'},
  ]);
};
