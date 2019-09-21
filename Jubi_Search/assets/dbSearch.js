var mongoose = require("mongoose");
var User = require("./dbSchema");
mongoose.connect(
  "mongodb://localhost:27017/test",
  { useNewUrlParser: true },
  function(err) {
    if (err) console.log("Mongoose Connect Error !!");
  }
);

module.exports = {
  search: search => {
    try {
      return new Promise((resolve, reject) => {
        var filter = {
          $or: [
            { name: { $regex: search } },
            { email: { $regex: search } },
            { contact: { $regex: search } }
          ]
        };
        User.find(filter, function(err, data) {
          if (err) {
            return reject({ status: "error", data: err });
          }
          console.log(filter);
          return resolve({ status: "success", data: data });
        }).sort({ score: { $meta: "textScore" } }).limit = 5;
      });
    } catch (err) {
      console.log("search function error code " + err);
    }
  },

  createUser: user => {
    try {
      return new Promise((resolve, reject) => {
        console.log(JSON.stringify(user));
        var errorMsg = "";
        var userCount;
        function getCount() {
          return new Promise((resolve, reject) => {
            User.find(filter, function(err, data) {
              if (err) {
                console.log("error in get Count");
                return reject(err);
              }
              console.log("data length" + data.length);
              userCount = data.length;
              return resolve();
            });
          });
        }

        //---------------------------VALIDATION STARTED HERE-------------------------------

        console.log("Validation started...");
        if (user.name && user.email && user.contact) {
          nameValidation = /^[a-zA-Z ]+$/.test(user.name); //return type boolean
          emailValidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            user.email
          );
          contactValidation = /^[6-9]\d{9}$/.test(user.contact);
          if (!nameValidation) {
            errorMsg = errorMsg + "Name is not valid";
          }
          if (!emailValidation) {
            errorMsg = errorMsg + "Email is not valid";
          }
          if (!contactValidation) {
            errorMsg = errorMsg + "Contact is not valid";
          }
          if (nameValidation && emailValidation && contactValidation) {
            console.log("Validation -- SUCCESS");
            console.log("Checking Database for duplicate entry....");

            // ---------------------CHECKING DATABASE FOR EXISTING ENTRIES---------------
            (async function() {
              if (user.name && user.email && user.contact) {
                nameValidation = /^[a-zA-Z ]+$/.test(user.name); //return type boolean
                emailValidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                  user.email
                );
                contactValidation = /^[6-9]\d{9}$/.test(user.contact);
                if (!nameValidation) {
                  errorMsg = errorMsg + "Name is not valid";
                }
                if (!emailValidation) {
                  errorMsg = errorMsg + "Email is not valid";
                }
                if (!contactValidation) {
                  errorMsg = errorMsg + "Contact is not valid";
                }
                if (nameValidation && emailValidation && contactValidation) {
                  console.log("Validation -- SUCCESS");
                  console.log("Checking Database for duplicate entry....");

                  // ---------------------CHECKING DATABASE FOR EXISTING ENTRIES---------------
                  var filter = {
                    email: user.email,
                    contact: user.contact
                  };
                  var userCount;
                  //
                  function getCount() {
                    return new Promise((resolve, reject) => {
                      User.find(filter, function(err, data) {
                        if (err) {
                          console.log("error in get Count");
                          return reject(err);
                        }
                        console.log("data length" + data.length);
                        userCount = data.length;
                        return resolve();
                      });
                    });
                  }

                  // console.log("Matches found ------------>" + userCount);
                  console.log("getCOUNT VALUE" + getCount());
                  await getCount();
                  if (userCount == 0) {
                    console.log("No duplicates found....");
                    // ---------------------STORING IN DATABASE---------------------------------
                    var newUser = new User(user);
                    newUser.save(function(err, data) {
                      if (err) {
                        return reject({
                          status: "error",
                          data: "Error : Can't save your data"
                        });
                      }
                      return resolve({ status: "success", data: data });
                    });
                    console.log("Data stored....");
                  } else {
                    console.log(
                      "Data with same email and contact number exist"
                    );
                    return reject({
                      status: "error",
                      data: "Data with same email and contact number exist"
                    });
                  }
                } else {
                  return reject({
                    status: "error",
                    data: errorMsg
                  });
                }
              } else {
                return reject({
                  status: "error",
                  data: "Please enter all fields"
                });
              }
            })(async function() {
              var filter = {
                email: user.email,
                contact: user.contact
              };

              await getCount();
              console.log("getCOUNT VALUE" + getCount());
              if (userCount == 0) {
                console.log("No duplicates found....");
                // ---------------------STORING IN DATABASE---------------------------------
                var newUser = new User(user);
                newUser.save(function(err, data) {
                  if (err) {
                    return reject({
                      status: "error",
                      data: "Error : Can't save your data"
                    });
                  }
                  return resolve({ status: "success", data: data });
                });
                console.log("Data stored....");
              } else {
                console.log("Data with same email and contact number exist");
                return reject({
                  status: "error",
                  data: "Data with same email and contact number exist"
                });
              }
            });
          } else {
            return reject({
              status: "error",
              data: errorMsg
            });
          }
        } else {
          return reject({
            status: "error",
            data: "Please enter all fields"
          });
        }
      });
    } catch (err) {
      console.log("Create User function error code " + err);
    }
  }
};
