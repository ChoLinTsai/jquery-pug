window.editUserModal = editUserModal;
window.deleteUserModal = deleteUserModal;
const API_USERS_URL = 'http://localhost:3000/api/users/';
const API_LOGOUT_URL = 'http://localhost:3000/auth/logout';
let prevPassword;
let editUserID;

// open edit modal and get target user data
function editUserModal(event, userID) {
  event.preventDefault()
  $('#modal-confirm-btn').removeClass('add-mode').addClass('edit-mode');
  $('#userModalLabel').text('Edit user data');
  $.get(`${API_USERS_URL}${userID}`)
    .then(data => {
      let getData = data[0];
      $('#first_name').val(getData.first_name);
      $('#last_name').val(getData.last_name);
      $('#email').val(getData.email);
      $('#password').val(getData.password);
      prevPassword = getData.password;
      editUserID = getData.id;
    })
    .fail(() => alert('Fetched failed!'))
}

// open delete modal and get target user data
function deleteUserModal(event, userID) {
  event.preventDefault()
  $.get(`${API_USERS_URL}${userID}`)
    .then(data => {
      let getData = data[0];
      $('#del-user-id').text(`${getData.id}`)
      $('#del-user-first-name').text(`${getData.first_name}`)
      $('#del-user-last-name').text(`${getData.last_name}`)
    })
    .fail(() => alert('Fetched failed!'))
}

// jquery document ready function
$(function () {
  const getNameAry = document.cookie.split(';').map(
    data => data.split('').splice(10).join('').split('_').join(' ')
  );

  $('.header__userName').html(getNameAry)

  // open add modal and set to add-mode
  $('#add-btn').click(event => {
    event.preventDefault();
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
      first_name,
      last_name,
      email,
      password,
      confirm_password
    ] = $.map($('input'), data => {
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

      if (first_name === '') return alert('First Name is required.')
      if (last_name === '') return alert('Last Name is required.')
      if (email === '') return alert('Email is required.')
      if (!checkEmail($('#email').val())) return alert(alertMsg);
      if (password !== prevPassword) {
        if (password !== confirm_password) return alert(alertMsg)
      }

      if (confirm_password
        ? password !== confirm_password
        : false
      ) return alert(alertMsg)

      if (password === '' && confirm_password === '') return alert(alertMsg)

      let editUserData = {
        first_name: first_name,
        last_name: last_name,
        password: `${prevPassword === password ? '' : password}`,
        email: email,
      }
      $.ajax({
        url: `${API_USERS_URL}${editUserID}`,
        method: 'PUT',
        data: editUserData,
        success: window.location.reload(),
        error: () => alert('User updated failed!'),
      })
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

}); //eof document ready function