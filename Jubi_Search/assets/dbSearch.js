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
      });
    });
  },
  createUser: user => {
    return new Promise((resolve, reject) => {
      var newUser = new User(user);
      newUser.save(function(err, data) {
        if (err) {
          return reject({ status: "error", data: err });
        }
        return resolve({ status: "success", data: data });
      });
    });
  }
};
