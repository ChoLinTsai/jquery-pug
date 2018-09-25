const modals = require('./modals.js');
const API_USERS_URL = 'http://localhost:3000/api/users/';
const API_FILEUPLOAD_URL = 'http://localhost:3000/file/fileUpload/';
const API_FILEDOWNLOAD_URL = 'http://localhost:3000/file/fileDownload/';
const API_LOGOUT_URL = 'http://localhost:3000/auth/logout';
Object.assign(window, modals);
// .modals

// jquery document ready function
$(function () {

  let files;

  // open add modal and set to add-mode
  $('#add-btn').click(event => {
    event.preventDefault();
    $('#userID, #basic-addon6').addClass('d-none');
    $('input').val('');
    $('#modal-confirm-btn').removeClass('edit-mode').addClass('add-mode');
    $('#userModalLabel').text('Add a new user');
  })

  // clear input values after close modal
  $('#modal-close-btn').click(event => {
    event.preventDefault();
    $('input').val('');
  })

  // key up event to update input values
  $('input').keyup((event) => {
    $(this).val(`${event.target.value}`);
  })

  // confirm action is add||edit to create||edit user data 
  $('#modal-confirm-btn').click(event => {
    event.preventDefault()
    let [
      file,
      id,
      first_name,
      last_name,
      email,
      password,
      confirm_password
    ] = $.map($('input'), data => {
      console.log(22, data)
      return data.value;
    })

    if ($('#modal-confirm-btn').hasClass('add-mode')) {
      // add mode
      if ($('#first_name').val() === '') return alert('First Name is required.');
      if ($('#last_name').val() === '') return alert('Last Name is required.');
      if ($('#email').val() === '') return alert('Email is required.')
      if (!checkEmail($('#email').val())) return alert('Please check your email!');
      if ($('#password').val() === '') return alert('Password is required.');
      if ($('#confirm_password').val() === '') return alert('Confirm Password is required.');
      if ($('#password').val() === $('#confirm_password').val()) {
        let newUserData = {
          first_name: first_name,
          last_name: last_name,
          email: email,
          password: password
        }

        console.log(111, newUserData)

        $.ajax({
          url: API_USERS_URL,
          method: 'POST',
          data: newUserData,
          success: window.location.reload(),
          error: () => alert('User created failed!'),
        })

      } else {
        alert('Please confirm/check your password!')
      }
    }


    if ($('#modal-confirm-btn').hasClass('edit-mode')) {
      // edit mode
      let alertMsg = 'Please check/confirm your password!';
      if (first_name === '') return alert('First Name is required.');
      if (last_name === '') return alert('Last Name is required.');
      if (email === '') return alert('Email is required.');
      if (!checkEmail($('#email').val())) return alert(alertMsg);
      if (password !== $('#password').attr('data-prevpassword')) {
        if (password !== confirm_password) return alert(alertMsg);
      }

      if (confirm_password
        ? password !== confirm_password
        : false
      ) return alert(alertMsg);

      if (password === '' && confirm_password === '') return alert(alertMsg);

      let editUserData = {
        first_name: first_name,
        last_name: last_name,
        password: `${$('#password').attr('data-prevpassword') === password ? '' : password}`,
        email: email,
      };

      $.ajax({
        url: `${API_USERS_URL}${id}`,
        method: 'PUT',
        data: editUserData,
        success: window.location.reload(),
        error: () => alert('User updated failed!'),
      });
    }
  })

  // confirm delete target user data
  $('#delete-confirm-btn').click(() => {
    $.ajax({
      url: `${API_USERS_URL}${$('#del-user-id').text()}`,
      method: 'DELETE',
      success: window.location.reload(),
      error: () => alert('User deleted failed!'),
    })
  })


  // file upload

  $('#fileInput').change(event => files = event.target.files);

  $('#uploadBtn').click((event) => {
    event.preventDefault();
    if (!files) return alert('No file selected!');
    let formData = new FormData(files[0]);

    formData.append('Files', files[0], files[0].originalname)

    $.ajax({
      url: `${API_FILEUPLOAD_URL}`,
      type: 'POST',
      data: formData,
      cache: false,
      processData: false,
      contentType: false,
      success: (req, res) => {
        if (res === 'success') alert('File upload completed.');
        return;
      },
      error: err => console.log(err)
    })
      .then($('#fileInput').val(''))
      .then(window.location.reload())
  })


  // file download
  $('#downloadBtn').click(() => {
    let fileName = 'Slice.png';
    $.ajax({
      url: `${API_FILEDOWNLOAD_URL}${fileName}`,
      method: 'GET',
      success: res => {
        if (res === 'success') alert('File download completed.');
        return;
      },
      error: err => console.log(`Something went wrong, status : ${err.status}`)
    })
  })


  // logout function
  $('#logout-btn').click(() => {
    $.ajax({
      url: API_LOGOUT_URL,
      method: 'GET',
      success: location.href = '/',
      xhrFields: {
        withCredentials: true
      },
      error: () => alert('Logout failed!'),
    })
  })

  function checkEmail(email) {
    let regex = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    return regex.test(email);
  }


  if (location.hash) {
    $("a[href='" + location.hash + "']").tab("show");
  }
  $(document.body).on("click", "a[data-toggle]", function (event) {
    location.hash = this.getAttribute("href");
  });


  $(window).on("popstate", function () {
    var anchor = location.hash || $("a[data-toggle='tab']").first().attr("href");
    $("a[href='" + anchor + "']").tab("show");
  });

}); //eof document ready function

