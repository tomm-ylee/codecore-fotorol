// This file is using 'export' instead of 'module.exports'.
// Unlike 'module.exports', this will export individually named values separately

// This exports the following function under the name 'up'
exports.up = function(knex) {
  return knex.schema
    .createTable('posts', table => {
      table.increments('id');
      // creates a column that is unquie, is auto-generated,
      // increments with every row and is meant to be used as a primary key

      table.string('username');
      // name of method is datatype of column
      // first argument is the name of the column

      table.text('description');
      table.string('pictureUrl');
      table.timestamps(false, true);
      // timestamps creates 2 columns named `created_at`, `updated_at` which
      // will be initially the date when the row was created.
    });
};


// This exports the following function under the name 'down'
exports.down = function(knex) {
  return knex.schema.dropTable('posts');
};
