$(function () {
  // Login function
  $('.inputField__loginBtn').click((e) => {
    e.preventDefault();
    $.when(
      $.ajax({
        url: 'http://localhost:3001/userPage',
        success: (req, res) => {
          location.href = '/userPage'
        }
      })
    )


  })

  // Logout function
  $('.header__logoutBtn').click((e) => {
    e.preventDefault();
    $.ajax({
      url: 'http://localhost:3001/',
      success: (req, res) => {
        location.href = '/'
      }
    })
  })





}); //eof document ready function