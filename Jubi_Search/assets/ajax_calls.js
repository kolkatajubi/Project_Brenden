var ajaxapi = {
  signup: (username, email, mobile) => {
    return new Promise(async (resolve, reject) => {
      let req = { name: username, email: email, contact: mobile };
      let start = new Date().getTime();
      let resp = await request_server(
        "https://pixie.jubi.ai/jubisearch/createUser",
        req
      );
      let end = new Date().getTime();
      console.log(end - start + "time ");
      console.log("returning from ajax signup....");
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
          "https://pixie.jubi.ai/jubisearch/search",
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
    console.log("Request server called.....");
    $.ajax({
      url: url,
      type: "post",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: resp => {
        console.log("Request server resolved.....");
        return resolve(resp);
      },
      error: err => {
        console.log("Error");
        return resolve({ status: "error", data: err });
      }
    });
  });
}
