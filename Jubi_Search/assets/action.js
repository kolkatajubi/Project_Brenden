$(document).ready(() => {

  $('input').on('keyup', function(){
    // console.log('inside keyup')

    hideError()
    let username = $("#username").val();
    let email = $("#emailadd").val();
    let mobile = $("#number").val();
    // console.log(mobile)
    
    if (username.length==0 || email.length==0 || mobile.length==0){
      showError("Field should not be empty")
    }
    else{
      if (!(/^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/.test(username))){
        showError("Name should be only letters and space")
      }
  
      if (!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))){
        showError("Enter valid email")
      }
      
      if(!(/^\d+$/.test(mobile))){
        // console.log("err")
        showError("Contact should be numeric")
      }
      else {
        if(!(mobile.length == 10)){
          // console.log("err")
          showError("Contact length should be 10")
        }
      }
    }
    
  })

  $(".click1").click(() => {
    $('.click1').css('background-color', 'lightgrey');
    $('.click2').css('background-color', 'white');
    $(".formContainer").show();
    $(".searchContainer").hide();
    hideError()
    $("#register-success").hide()
  });

  $(".click2").click(() => {
    $('.click2').css('background-color', 'lightgrey');
    $('.click1').css('background-color', 'white');
    $(".formContainer").hide();
    $(".searchContainer").show();
    hideError()
    $("#register-success").hide()
  });

  $(".submitbutton").click(async () => {
    hideError()
    $("#register-success").show()
    let username = $("#username").val();
    let email = $("#emailadd").val();
    let mobile = $("#number").val();
    // console.log(mobile)
    
    if (username.length==0 || email.length==0 || mobile.length==0){
      $(".errmsg").html("Field should not be empty")
      $(".errmsg").show()
    }
    else{
      if (!(/^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/.test(username))){
        console.log("err")
        $(".errmsg").html("Name should be only letters and space")
        $(".errmsg").show()
      }
  
      if (!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))){
        $(".errmsg").html("Enter valid email")
        $(".errmsg").show()
      }
      
      if(!(/^\d+$/.test(mobile))){
        // console.log("err")
        showError("Contact should be numeric")
      }
      else {
        if(!(mobile.length == 10)){
          // console.log("err")
          showError('Contact length should be 10')
        }
      }
    }
    
    let signupStatus = await testapi.signup(
      username.toLowerCase(),
      email.toLowerCase(),
      mobile
    );
    if (signupStatus.status == "success") {
      $("#register-success").show();
      $(".container").hide();
    } else {
      $("#errmsg").html(data);
      $(".formContainer").hide();
    }
  });



  function showError(msg) {
    $(".errmsg").html(msg)
    $(".errmsg").show()
  }

  function hideError() {
    $(".errmsg").hide()
  }

  $(".searchSubmit").click(async () => {
    $(".errmsg").hide()
    $("#register-success").hide()
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
    else {
      showError(resp.data)
    }
  });
});
