const fs = require("fs");
var request = require("request");

fs.readFile(
  "C:/Users/sanje/Desktop/Project_Brenden/Jubi_Search/data_1.json",
  "utf8",
  (err, fileContents) => {
    if (err) {
      console.error(err);
      return;
    }
    try {
      const data = JSON.parse(fileContents);

      data.forEach(element => {
        console.log(element);

        var options = {
          uri: "http://192.168.0.105:3125/createUser",
          method: "POST",
          json: element
        };

        request(options, function(error, response, body) {
          if (!error && response.statusCode == 200) {
            console.log(body.id);
          }
        });
      });
    } catch (err) {
      console.error(err);
    }
  }
);
