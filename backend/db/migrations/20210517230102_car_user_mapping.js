const { onUpdateTrigger } = require("../utils/updateTrigger");

exports.up = async (knex) => {
  console.log("[Schema : car_rentals]  Creating table : car_user_mapping");
  await knex.schema
    .withSchema("car_rentals")
    .createTable("car_user_mapping", (table) => {
      table.increments("id").primary();
      table
        .integer("car_id")
        .notNullable()
        .references("id")
        .inTable("car_rentals.cars")
        .onDelete("CASCADE");
      table
        .integer("user_id")
        .notNullable()
        .references("id")
        .inTable("user_management.users")
        .onDelete("CASCADE");
      table.timestamp("start_time").notNullable();
      table.timestamp("end_time").notNullable();
      table.float("total_price").notNullable();
      table.timestamps(true, true);
    });

  await knex.raw(
    "ALTER SEQUENCE car_rentals.car_user_mapping_id_seq RESTART WITH 1000000"
  );

  await knex.raw(onUpdateTrigger(`car_rentals.car_user_mapping`));
};
exports.down = async (knex) => {
  console.log("[Schema : car_rentals]  Dropping Table : car_user_mapping");
  await knex.raw("DROP TABLE IF EXISTS car_rentals.car_user_mapping;");
};
