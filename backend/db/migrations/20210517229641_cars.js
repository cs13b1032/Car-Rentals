const { onUpdateTrigger } = require("../utils/updateTrigger");

exports.up = async (knex) => {
  console.log("[Schema : car_rentals]  Creating table : cars");
  await knex.schema.withSchema("car_rentals").createTable("cars", (table) => {
    table.increments("id").primary();
    table.text("car_license_number").notNullable();
    table.text("manufacturer").notNullable();
    table.text("model").notNullable();
    table.float("base_price").notNullable();
    table.float("price_per_hour").notNullable();
    table.float("security_deposit").notNullable(); // currency not considering
    table.text("currency_type").notNullable().defaultTo("INR");
    table.timestamps(true, true);
  });

  await knex.raw("ALTER SEQUENCE car_rentals.cars_id_seq RESTART WITH 1000000");

  await knex.raw(onUpdateTrigger(`car_rentals.cars`));
};
exports.down = async (knex) => {
  console.log("[Schema : car_rentals]  Dropping Table : cars");
  await knex.raw("DROP TABLE IF EXISTS car_rentals.cars;");
};
