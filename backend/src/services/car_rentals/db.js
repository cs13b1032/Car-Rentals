"use strict";

const config = require("@config/config");
const db = config.getDb();
const knex = require("knex");

function getCarDetails(carId) {
  return db.select("*").from("car_rentals.cars").where("id", carId).first();
}

function insertCar(trx, carObj) {
  return db("car_rentals.cars").transacting(trx).insert(carObj).returning("id");
}

function updateCar(trx, carObj, carId) {
  return db("car_rentals.cars")
    .transacting(trx)
    .update(carObj)
    .where("id", carId)
    .returning("id");
}

function deleteCar(trx, carId) {
  return db("car_rentals.cars").transacting(trx).where("id", carId).del();
}

function bookCarUsage(trx, carUsageObj) {
  return db("car_rentals.car_user_mapping")
    .transacting(trx)
    .insert(carUsageObj)
    .returning("id");
}

function checkCarAvailability(fromTime, toTime, carId) {
  let query = db
    .select("*")
    .from("car_rentals.car_user_mapping as cm")
    .where("cm.car_id", carId)
    .where("end_time", ">", fromTime)
    .where("start_time", "<=", toTime);

  return query;
}

function getSearchCarResults(fromTime, toTime) {
  let query = db
    .select(
      "car.id as car_id",
      "car_license_number",
      "manufacturer",
      "model",
      "base_price",
      "price_per_hour",
      "security_deposit",
      "currency_type"
    )
    .from("car_rentals.car_user_mapping as cm")
    .join(`car_rentals.cars as car`, function () {
      this.on(`cm.car_id`, `car.id`);
    })
    .whereNot((builder) =>
      builder.where("end_time", ">", fromTime).where("start_time", "<=", toTime)
    );

  return query;
}

function getCarBookings(carId) {
  return db
    .select(
      "cm.id as booking_id",
      "start_time",
      "end_time",
      "total_price",
      "first_name",
      "last_name",
      "mobile",
      "email"
    )
    .from("car_rentals.car_user_mapping as cm")
    .join(`user_management.users as user`, function () {
      this.on(`cm.user_id`, `user.id`);
    })
    .where("car_id", carId);
}

function getUserBookings(userId) {
  return db
    .select(
      "cm.id as booking_id",
      "start_time",
      "end_time",
      "total_price",
      "car_license_number",
      "manufacturer",
      "model",
      "base_price",
      "price_per_hour",
      "security_deposit",
      "currency_type"
    )
    .from("car_rentals.car_user_mapping as cm")
    .join(`car_rentals.cars as car`, function () {
      this.on(`cm.car_id`, `car.id`);
    })
    .where("user_id", userId);
}

module.exports = {
  getCarDetails,
  insertCar,
  updateCar,
  deleteCar,
  bookCarUsage,
  checkCarAvailability,
  getCarBookings,
  getUserBookings,
  getSearchCarResults,
};
