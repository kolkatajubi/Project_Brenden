var ajaxapi = {
  signup: (username, email, mobile) => {
    return new Promise(async (resolve, reject) => {
      let req = { name: username, email: email, contact: mobile };
      let resp = await request_server(
        "http://192.168.0.105:3125/createUser",
        req
      );
      return resolve(resp);
    });
  },
  search: input_data => {
    return new Promise(async (resolve, reject) => {
      let req = {};
      // console.log("search ajax" + input_data);
      console.log("searched for..... " + input_data);
      if (input_data.length > 0) {
        req = { search: input_data };
        let resp = await request_server(
          "http://192.168.0.105:3125/search",
          req
        );
        return resolve(resp);
      }
    });
  }
};

function request_server(url, data) {
  return new Promise((resolve, reject) => {
    // console.log("request server" + url);
    $.ajax({
      url: url,
      type: "post",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: resp => {
        return resolve(resp);
      },
      error: err => {
        console.log("Error");
        return resolve({ status: "error", data: err });
      }
    });
  });
}
