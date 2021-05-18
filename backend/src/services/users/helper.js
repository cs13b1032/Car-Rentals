function createUserObj(firstName, lastName, email, mobile) {
  //  have to use ORM
  const userObj = {
    first_name: firstName,
    last_name: lastName,
    email: email,
    mobile: mobile,
  };
  return userObj;
}

function updateUserObj(firstName, lastName, email, mobile) {
  //  have to use ORM
  const userObj = {};
  if (firstName) {
    userObj["first_name"] = firstName;
  }
  if (lastName) {
    userObj["last_name"] = lastName;
  }
  if (email) {
    userObj["email"] = email;
  }
  if (mobile) {
    userObj["mobile"] = mobile;
  }
  return userObj;
}
module.exports = {
  createUserObj,
  updateUserObj,
};
