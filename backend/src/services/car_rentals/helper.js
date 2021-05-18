function addCarObj(
  carLicenseNumber,
  manufacturer,
  model,
  basePrice,
  pricePerHour,
  securityDeposit
) {
  //  have to use ORM
  const carObj = {
    car_license_number: carLicenseNumber,
    manufacturer: manufacturer,
    model: model,
    base_price: basePrice,
    price_per_hour: pricePerHour,
    security_deposit: securityDeposit,
  };
  return carObj;
}

function updateCarObj(
  carLicenseNumber,
  manufacturer,
  model,
  basePrice,
  pricePerHour,
  securityDeposit
) {
  //  have to use ORM
  const carObj = {};
  if (carLicenseNumber) {
    carObj["car_license_number"] = carLicenseNumber;
  }
  if (manufacturer) {
    carObj["manufacturer"] = manufacturer;
  }
  if (model) {
    carObj["model"] = model;
  }
  if (basePrice) {
    carObj["base_price"] = basePrice;
  }
  if (pricePerHour) {
    carObj["price_per_hour"] = pricePerHour;
  }
  if (securityDeposit) {
    carObj["security_deposit"] = securityDeposit;
  }
  return carObj;
}

function bookCarUsageObj(fromTime, toTime, carId, price, userId) {
  const carUsageObj = {
    start_time: fromTime,
    end_time: toTime,
    car_id: carId,
    user_id: userId,
    total_price: price,
  };
  return carUsageObj;
}

module.exports = {
  addCarObj,
  updateCarObj,
  bookCarUsageObj,
};
