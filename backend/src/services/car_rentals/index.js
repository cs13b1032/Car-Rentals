"use strict";

const { addCarObj, updateCarObj, bookCarUsageObj } = require("./helper");
const config = require("@config/config");
const db = config.getDb();

const {
  getCarDetails,
  insertCar,
  updateCar,
  deleteCar,
  bookCarUsage,
  checkCarAvailability,
  getCarBookings,
  getUserBookings,
  getSearchCarResults
} = require("./db");

const _this = (module.exports = {
  addCar: async (
    carLicenseNumber,
    manufacturer,
    model,
    basePrice,
    pricePerHour,
    securityDeposit
  ) => {
    try {
      const carObj = addCarObj(
        carLicenseNumber,
        manufacturer,
        model,
        basePrice,
        pricePerHour,
        securityDeposit
      );
      const response = await db.transaction(async (trx) => {
        return insertCar(trx, carObj);
      });

      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  getCar: async (carId) => {
    try {
      const carDetails = await getCarDetails(carId);
      return carDetails;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  updateCar: async (
    carLicenseNumber,
    manufacturer,
    model,
    basePrice,
    pricePerHour,
    securityDeposit,
    carId
  ) => {
    try {
      const carObj = updateCarObj(
        carLicenseNumber,
        manufacturer,
        model,
        basePrice,
        pricePerHour,
        securityDeposit
      );
      const response = await db.transaction(async (trx) => {
        return updateCar(trx, carObj, carId);
      });

      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  deleteCar: async (carId) => {
    try {
      const response = await db.transaction(async (trx) => {
        return deleteCar(trx, carId);
      });

      return response;
    } catch (error) {
      throw error;
    }
  },

  searchCars: async (fromTime, toTime) => {
    try {
      const searchCarResults = await getSearchCarResults(fromTime, toTime);
      return searchCarResults;
    } catch (error) {
      console.log(error)
      throw error;
    }
  },
  calculatePriceofCar: async (fromTime, toTime, carId) => {
    try {
      const carDetails = await getCarDetails(carId);
      const numberOfHours = (new Date(toTime) - new Date(fromTime)) / 3600000;
      return {
        price_per_hour: carDetails.price_per_hour,
        base_price: carDetails.base_price,
        security_deposit: carDetails.security_deposit,
        total_price:
          carDetails.price_per_hour * numberOfHours +
          carDetails.base_price +
          carDetails.security_deposit,
        currency_type: carDetails.currency_type,
      };
    } catch (error) {
      throw error;
    }
  },
  userBookings: async (userId) => {
    try {
      const userBookings = await getUserBookings(userId);
      return userBookings;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  carBookings: async (carId) => {
    try {
      const carBookings = await getCarBookings(carId);
      return carBookings;
    } catch (error) {
      throw error;
    }
  },
  bookCar: async (fromTime, toTime, carId, price, userId) => {
    try {
      const checkifCarisAvailableIntheTimeSlot = await checkCarAvailability(
        fromTime,
        toTime,
        carId
      );
      const carPrice = await _this.calculatePriceofCar(fromTime, toTime, carId);

      if (carPrice.total_price !== price) {
        return { val: 0 };
      }

      const carUsageObj = bookCarUsageObj(
        fromTime,
        toTime,
        carId,
        price,
        userId
      );
      if (checkifCarisAvailableIntheTimeSlot.length === 0) {
        const response = await db.transaction(async (trx) => {
          return bookCarUsage(trx, carUsageObj);
        });

        return { val: 1, response: response };
      } else {
        return { val: 2 }; // send appropriate response
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
});
