"use strict";

const carRentalController = require("../controllers/car_rental_controller");

module.exports = {
  addCar: {
    method: "post",
    path: "/car",
    function: carRentalController.addCar,
  },
  getCar: {
    method: "get",
    path: "/car",
    function: carRentalController.getCar,
  },
  updateCar: {
    method: "patch",
    path: "/car",
    function: carRentalController.updateCar,
  },
  deleteCar: {
    method: "delete",
    path: "/car",
    function: carRentalController.deleteCar,
  },
  searchCars: {
    method: "get",
    path: "/search-cars",
    function: carRentalController.searchCars,
  },
  calculatePriceofCar: {
    method: "get",
    path: "/calculate-price",
    function: carRentalController.calculatePriceofCar,
  },
  userBookings: {
    method: "get",
    path: "/user/bookings",
    function: carRentalController.userBookings,
  },
  carBookings: {
    method: "get",
    path: "/car/bookings",
    function: carRentalController.carBookings,
  },
  bookCar: {
    method: "post",
    path: "/car/book",
    function: carRentalController.bookCar,
  },
};
