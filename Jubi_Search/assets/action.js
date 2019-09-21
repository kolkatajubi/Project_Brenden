$(document).ready(() => {
  $(".click1").click(() => {
    $(".formContainer").show();
    $(".searchContainer").hide();
  });

  $(".click2").click(() => {
    $(".formContainer").hide();
    $(".searchContainer").show();
  });

  $(".submitbutton").click(async () => {
    let username = $("#username").val();
    let email = $("#emailadd").val();
    let mobile = $("#number").val();
    let signupStatus = await testapi.signup(
      username.toLowerCase(),
      email.toLowerCase(),
      mobile
    );
    if (signupStatus.status == "success") {
      $("#register-success").show();
      $(".container").hide();
    } else {
      $("#register-error").show();
      $(".formContainer").hide();
    }
  });

  $(".searchSubmit").click(async () => {
    $("table")
      .find("tr:gt(0)")
      .remove();
    let text = $("#search").val();
    console.log(text);
    if (!text) {
      return;
    }
    let resp = await testapi.search(text.toLowerCase());
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
    }
  });
});
