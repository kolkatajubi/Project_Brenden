$(document).ready(() => {
  $(".click1").click(() => {
    $(".click1").css("background-color", "lightgrey");
    $(".click2").css("background-color", "white");
    $(".formContainer").show();
    $(".searchContainer").hide();
    hideError();
    $("#register-success").hide();
  });

  $(".click2").click(() => {
    $(".click2").css("background-color", "lightgrey");
    $(".click1").css("background-color", "white");
    $(".formContainer").hide();
    $(".searchContainer").show();
    hideError();
    $("#register-success").hide();
  });

  $(".submitbutton").click(async () => {
    // hideError();
    let username = $("#username").val();
    let email = $("#emailadd").val();
    let mobile = $("#number").val();

    let signupStatus = await testapi.signup(username, email, mobile);
    if (signupStatus.status == "success") {
      $("#register-success").show();
      hideError();
      // $(".container").hide();
    } else {
      $("#errmsg").html(data);
      $("#register-success").hide();
      $(".formContainer").hide();
    }
  });

  $(".searchSubmit").click(async () => {
    $(".errmsg").hide();
    $("#register-success").hide();
    $("table")
      .find("tr:gt(0)")
      .remove();
    let text = $("#search").val();
    console.log(text);
    if (!text) {
      return;
    }
    let resp = await testapi.search(text);
    console.log(JSON.stringify(resp));
    if (resp.status == "success") {
      $(".tableContainer").show();
      let users = resp.data;
      console.log(users.length + "len");
      $("table").append(users);
      for (let i = 0; i < users.length; i++) {
        console.log("appending now");
        $("table").append(
          "<tr><td>" +
            users[i].name +
            "</td>" +
            "<td>" +
            users[i].email +
            "</td>" +
            "<td>" +
            users[i].contact +
            "</td></tr>"
        );
      }
    } else {
      showError(resp.data);
    }
  });
});
