"use strict";
const carRentalService = require("../../services/car_rentals");

module.exports = {
  addCar: async (req, res) => {
    try {
      const {
        car_license_number: carLicenseNumber,
        manufacturer: manufacturer,
        model: model,
        base_price: basePrice,
        price_per_hour: pricePerHour,
        security_deposit: securityDeposit,
      } = req.body;

      if (
        !(
          carLicenseNumber &&
          manufacturer &&
          model &&
          basePrice &&
          pricePerHour &&
          securityDeposit
        )
      ) {
        res
          .status(400)
          .send(
            "one of the required parameter is not provided in request body"
          );
      } else {
        const result = await carRentalService.addCar(
          carLicenseNumber,
          manufacturer,
          model,
          basePrice,
          pricePerHour,
          securityDeposit
        );
        res.status(201).json(result);
      }
    } catch (error) {
      res
        .status(400)
        .send("Error in the API : Service is not completly sophisticated yet");
    }
  },

  getCar: async (req, res) => {
    try {
      const carId = req.query.carId;

      if (!carId) {
        res.status(400).send("carId is not provided in request body");
      } else {
        const result = await carRentalService.getCar(carId);
        res.status(201).json(result);
      }
    } catch (error) {
      res
        .status(400)
        .send("Error in the API : Service is not completly sophisticated yet");
    }
  },

  updateCar: async (req, res) => {
    try {
      const {
        car_license_number: carLicenseNumber,
        manufacturer: manufacturer,
        model: model,
        base_price: basePrice,
        price_per_hour: pricePerHour,
        security_deposit: securityDeposit,
      } = req.body;

      const carId = req.query.carId;
      if (!carId) {
        res.status(400).send("car Id is not provided in request body");
      } else if (
        !(
          carLicenseNumber ||
          manufacturer ||
          model ||
          basePrice ||
          pricePerHour ||
          securityDeposit
        )
      ) {
        res
          .status(400)
          .send(
            "one of the required parameter is not provided in request body"
          );
      } else {
        const result = await carRentalService.updateCar(
          carLicenseNumber,
          manufacturer,
          model,
          basePrice,
          pricePerHour,
          securityDeposit,
          carId
        );
        res.status(201).json(result);
      }
    } catch (error) {
      res
        .status(400)
        .send("Error in the API : Service is not completly sophisticated yet");
    }
  },

  deleteCar: async (req, res) => {
    try {
      const carId = req.query.carId;

      if (!carId) {
        res.status(400).send("carId is not provided in request body");
      } else {
        const result = await carRentalService.deleteCar(carId);
        res.status(201).json(result);
      }
    } catch (error) {
      res
        .status(400)
        .send("Error in the API : Service is not completly sophisticated yet");
    }
  },

  searchCars: async (req, res) => {
    try {
      const { from_time: fromTime, to_time: toTime } = req.body;
      if (!(fromTime && toTime)) {
        res
          .status(400)
          .send(
            "one of the required parameter is not provided in request body"
          );
      } else {
        const result = await carRentalService.searchCars(fromTime, toTime);
        res.status(201).json(result);
      }
    } catch (error) {
      res
        .status(400)
        .send("Error in the API : Service is not completly sophisticated yet");
    }
  },

  calculatePriceofCar: async (req, res) => {
    try {
      const { from_time: fromTime, to_time: toTime, car_id: carId } = req.body;
      if (!(fromTime && toTime && carId)) {
        res
          .status(400)
          .send(
            "one of the required parameter is not provided in request body"
          );
      } else {
        const result = await carRentalService.calculatePriceofCar(
          fromTime,
          toTime,
          carId
        );
        res.status(201).json(result);
      }
    } catch (error) {
      res
        .status(400)
        .send("Error in the API : Service is not completly sophisticated yet");
    }
  },

  userBookings: async (req, res) => {
    try {
      const userId = req.query.userId;
      if (!userId) {
        res.status(400).send("userId is not provided in request query");
      } else {
        const result = await carRentalService.userBookings(userId);
        res.status(201).json(result);
      }
    } catch (error) {
      res
        .status(400)
        .send("Error in the API : Service is not completly sophisticated yet");
    }
  },

  carBookings: async (req, res) => {
    try {
      const carId = req.query.carId;
      if (!carId) {
        res.status(400).send("carId is not provided in request query");
      } else {
        const result = await carRentalService.carBookings(carId);
        res.status(201).json(result);
      }
    } catch (error) {
      res
        .status(400)
        .send("Error in the API : Service is not completly sophisticated yet");
    }
  },

  bookCar: async (req, res) => {
    try {
      const { from_time: fromTime, to_time: toTime, car_id: carId, price: price } = req.body;
      const userId = req.query.userId;
      if (!userId) {
        res.status(400).send("userId is not provided in request query");
      }
      if (!(fromTime && toTime && carId && price)) {
        res
          .status(400)
          .send(
            "one of the required parameter is not provided in request body"
          );
      } else {
        const result = await carRentalService.bookCar(
          fromTime,
          toTime,
          carId,
          price,
          userId
        );
        if (result.val == 0) {
          res.status(201).json("payment is not matching");
        } else if (result.val == 2) {
          res.status(201).json("Car cannot be booked in the given timeSlot");
        } else {
          res.status(201).json(result.response);
        }
      }
    } catch (error) {
      res
        .status(400)
        .send("Error in the API : Service is not completly sophisticated yet");
    }
  },
};
