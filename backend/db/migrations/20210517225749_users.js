const { onUpdateTrigger } = require("../utils/updateTrigger");

exports.up = async (knex) => {
  console.log("[Schema : user_management]  Creating table : users");
  await knex.schema
    .withSchema("user_management")
    .createTable("users", (table) => {
      table.increments("id").primary();
      table.text("first_name").notNullable();
      table.text("last_name");
      table.text("mobile").unique().notNullable();
      table.text("email").unique().notNullable();
      table.boolean("is_admin").defaultTo(false);
      // table.boolean('is_email_verified').defaultTo(false); // email verify
      // table.boolean('mobile_verified').defaultTo(false); // mobile verify
      table.timestamps(true, true);
    });

  await knex.raw(
    "ALTER SEQUENCE user_management.users_id_seq RESTART WITH 1000000"
  );

  await knex.raw(onUpdateTrigger(`user_management.users`));
};
exports.down = async (knex) => {
  console.log("[Schema : user_management]  Dropping Table : users");
  await knex.raw("DROP TABLE IF EXISTS user_management.users;");
};
