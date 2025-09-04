/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('items').del()
  await knex('items').insert([
    { item_name: 'Cordless Drill', description: ' durable, shop-grade hardware for professional and DIY use', quantity: '0'},
    { item_name: 'Hammer Drill', description: ' durable, shop-grade hardware for professional and DIY use', quantity: '0'},
    { item_name: 'Impact Driver', description: ' durable, shop-grade hardware for professional and DIY use', quantity: '0'},
    { item_name: 'Circular Saw', description: ' durable, shop-grade hardware for professional and DIY use', quantity: '0'},
    { item_name: 'Jigsaw', description: ' durable, shop-grade hardware for professional and DIY use', quantity: '0'},
    { item_name: 'Reciprocating Saw', description: ' durable, shop-grade hardware for professional and DIY use', quantity: '0'},
    { item_name: 'Angle Grinder', description: ' durable, shop-grade hardware for professional and DIY use', quantity: '0'},
    { item_name: 'Belt Sander', description: ' durable, shop-grade hardware for professional and DIY use', quantity: '0'},
    { item_name: 'Orbital Sander', description: ' durable, shop-grade hardware for professional and DIY use', quantity: '0'},
    { item_name: 'Rotary Tool', description: ' durable, shop-grade hardware for professional and DIY use', quantity: '0'},
    { item_name: 'Heat Gun', description: ' durable, shop-grade hardware for professional and DIY use', quantity: '0'},
    { item_name: 'Framing Nailer', description: ' durable, shop-grade hardware for professional and DIY use', quantity: '0'},
    { item_name: 'Finish Nailer', description: ' durable, shop-grade hardware for professional and DIY use', quantity: '0'},
    { item_name: 'Air Compressor', description: ' durable, shop-grade hardware for professional and DIY use', quantity: '0'},
    { item_name: 'Wet/Dry Vacuum', description: ' durable, shop-grade hardware for professional and DIY use', quantity: '0'},
    { item_name: 'Table Saw', description: ' durable, shop-grade hardware for professional and DIY use', quantity: '0'},
    { item_name: 'Miter Saw', description: ' durable, shop-grade hardware for professional and DIY use', quantity: '0'},
    { item_name: 'Router', description: ' durable, shop-grade hardware for professional and DIY use', quantity: '0'},
    { item_name: 'Thickness Planer', description: ' durable, shop-grade hardware for professional and DIY use', quantity: '0'},
    { item_name: 'Impact Wrench', description: ' durable, shop-grade hardware for professional and DIY use', quantity: '0'},
    { item_name: 'Oscillating Multi-Tool', description: 'durable, shop-grade hardware for professional and DIY use', quantity: '0'},
    { item_name: 'Claw Hammer', description: 'durable, shop-grade hardware for professional and DIY use', quantity: '0'},
    { item_name: 'Ball Peen Hammer', description: ' durable, shop-grade hardware for professional and DIY use', quantity: '0'},
    { item_name: 'Sledgehammer', description: ' durable, shop-grade hardware for professional and DIY use', quantity: '0'},
    { item_name: 'Screwdriver Set', description: ' durable, shop-grade hardware for professional and DIY use', quantity: '0'}
  ]);
};
