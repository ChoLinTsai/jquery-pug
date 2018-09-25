$(function () {
  const API_LOGIN_URL = "http://localhost:3000/auth/login";

  // Login function
  $('#inputField__loginBtn').click((e) => {

    e.preventDefault();
    let userLoginData = {
      user_id: $('#input-userID').val(),
      user_pw: $('#input-userPW').val(),
    }
    $.ajax({
      url: API_LOGIN_URL,
      method: 'POST',
      data: userLoginData,
      error: () => {
        return alert('Please confirm/check your ID/PW');
      },
      success: () => {
        return location.href = '/manager'
      },
      xhrFields: {
        withCredentials: true
      }
    })
  })
}); //eof document ready function