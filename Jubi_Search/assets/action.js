$(document).ready(function() {
  $("#registration_form").show();
  $("#register_success").hide();
  $(".click_signup").click(() => {
    $("table")
      .find("tr:gt(0)")
      .remove();
    $(".click_signup").css("background-color", "white");
    $(".click_search").css("background-color", "lightgrey");
    $("#registration_form").show();
    $("#search_container").hide();
    $("#register_success").hide();
    $("table").hide();
    $("#form_name").val("");
    $("#form_email").val("");
    $("#form_contact").val("");
    $("#search").val("");

    $("#form_name").css("border-bottom", "none");
    $("#form_email").css("border-bottom", "none");
    $("#form_contact").css("border-bottom", "none");
    $("#name_error_message").hide();
    $("#email_error_message").hide();
    $("#contact_error_message").hide();
  });

  $(".click_search").click(() => {
    $("table")
      .find("tr:gt(0)")
      .remove();
    $(".click_search").css("background-color", "white");
    $(".click_signup").css("background-color", "lightgrey");
    $("#registration_form").hide();
    $("#search_container").show();
    $("#register_success").hide();
    $("table").hide();
    $("#search").val("");
  });

  $("#name_error_message").hide();
  $("#email_error_message").hide();
  $("#contact_error_message").hide();
  var error_name = false;
  var error_email = false;
  var error_contact = false;
  $("#form_name").focusout(function() {
    validate_name();
  });
  $("#form_email").focusout(function() {
    validate_email();
  });
  $("#form_contact").focusout(function() {
    validate_contact();
  });

  function validate_name() {
    var pattern = /^[a-zA-Z ]*$/;
    var name = $("#form_name").val();
    if (name == "") {
      $("#name_error_message").html("Field should not be empty");
      $("#name_error_message").show();
      $("#form_name").css("border-bottom", "2px solid #F90A0A");
      error_name = true;
    } else if (pattern.test(name) && name !== "") {
      $("#name_error_message").hide();
      $("#form_name").css("border-bottom", "2px solid #34F458");
    } else {
      $("#name_error_message").html("Only letters and spaces allowed");
      $("#name_error_message").show();
      $("#form_name").css("border-bottom", "2px solid #F90A0A");
      error_name = true;
    }
  }

  function validate_email() {
    var pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var email = $("#form_email").val();
    if (email == "") {
      $("#email_error_message").html("Field should not be empty");
      $("#email_error_message").show();
      $("#form_email").css("border-bottom", "2px solid #F90A0A");
      error_email = true;
    } else if (pattern.test(email) && email !== "") {
      $("#email_error_message").hide();
      $("#form_email").css("border-bottom", "2px solid #34F458");
    } else {
      $("#email_error_message").html("Invalid Email");
      $("#email_error_message").show();
      $("#form_email").css("border-bottom", "2px solid #F90A0A");
      error_email = true;
    }
  }

  function validate_contact() {
    var pattern = /^[6-9]\d{9}$/;
    var contact = $("#form_contact").val();
    var contact_length = $("#form_contact").val().length;
    if (contact == "") {
      $("#contact_error_message").html("Field should not be empty");
      $("#contact_error_message").show();
      $("#form_contact").css("border-bottom", "2px solid #F90A0A");
    } else if (
      contact[0] !== "6" &&
      contact[0] !== "7" &&
      contact[0] !== "8" &&
      contact[0] !== "9"
    ) {
      $("#contact_error_message").html("Must begin with 6, 7, 8, or 9");
      $("#contact_error_message").show();
      $("#form_contact").css("border-bottom", "2px solid #F90A0A");
      error_contact = true;
    } else if (contact_length !== 10) {
      $("#contact_error_message").html("Length must be 10");
      $("#contact_error_message").show();
      $("#form_contact").css("border-bottom", "2px solid #F90A0A");
      error_contact = true;
    } else if (pattern.test(contact)) {
      $("#contact_error_message").hide();
      $("#form_contact").css("border-bottom", "2px solid #34F458");
    } else {
      $("#contact_error_message").html("Only numbers[0-9] allowed");
      $("#contact_error_message").show();
      $("#form_contact").css("border-bottom", "2px solid #F90A0A");
      error_contact = true;
    }
  }

  $("#register_submit").click(async function() {
    error_name = false;
    error_email = false;
    error_contact = false;

    //-------- VALIDATE ALL 3 FIELDS ON REGISTER BUTTON CLICK ---------
    validate_name();
    validate_email();
    validate_contact();

    if (
      error_name === false &&
      error_email === false &&
      error_contact === false
    ) {
      //-------------- CREATE USER AJAX----------------------
      let username = $("#form_name").val();
      let email = $("#form_email").val();
      let mobile = $("#form_contact").val();

      let signupStatus = await ajaxapi.signup(username, email, mobile);
      console.log(signupStatus);
      if (signupStatus.status == "success") {
        console.log("register success");
        $("#register_success").show();
        setTimeout(function() {
          $("#registration_form").hide();
          $("#search_container").show();
        }, 1000);
      } else {
        $("#register_success").html("User with same email and contact exists.");
        $("#register_success").show();
      }
    }
  });

  $("#search_submit").click(async function() {
    $(".errmsg").hide();
    $("#register-success").hide();
    $("table")
      .find("tr:gt(0)")
      .remove();
    let text = $("#search").val();
    // console.log(text);
    if (!text) {
      return;
    }
    let resp = await ajaxapi.search(text);
    console.log(JSON.stringify(resp));
    if (resp.status == "success") {
      $(".tableContainer").show();
      $("table").show();
      let users = resp.data;
      // console.log(users.length + "len");
      $("table").append(users);
      for (let i = 0; i < users.length; i++) {
        // console.log("appending now");
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
      $(".errmsg").html(resp.data);
      $(".errmsg").show();
    }
  });
});
