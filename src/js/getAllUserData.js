$(function () {
  const API_USERS_URL = 'http://localhost:3000/api/users/';
  const API_LOGOUT_URL = 'http://localhost:3000/auth/logout';
  let prevPassword;
  let editUserID;

  const getNameAry = document.cookie.split(';').map(
    data => data.split('').splice(10).join('').split('_').join(' ')
  );
  $('.header__userName').html(getNameAry)

  $.get(API_USERS_URL, (data) => {
    data.map(data => (
      $('.table__tbody:last-child').append(
        `<tr id='${data.id}'>
          <td>${data.id}</td>
          <td>${data.first_name}</td>
          <td>${data.last_name}</td>
          <td>${data.email}</td>
          <td>${data.created_time}</td>
          <td>${data.updated_time}</td>
          <td>
            <button
              type="button"
              id="edit-btn"
              class="btn btn-warning btn-sm"
              data-userid='${data.id}'
              data-toggle="modal"
              data-target="#userModal"
            >
              Edit
            </button>
            <button
              type="button"
              class="delete-btn btn btn-danger btn-sm"
              data-userid='${data.id}'
              data-toggle="modal"
              data-target="#deleteModal"
            >
              Delete
            </button>
          </td>
        </tr>`
      )
    ))
  })

  $('.table').on('click', '#edit-btn', (event) => {
    event.preventDefault()
    $('#modal-confirm-btn').removeClass('add-mode').addClass('edit-mode');
    $('#userModalLabel').text('Edit user data');

    $.get(`${API_USERS_URL}${event.target.getAttribute('data-userid')}`)
      .then(data => {
        $('input.first_name').val(data[0].first_name);
        $('input.last_name').val(data[0].last_name);
        $('input.email').val(data[0].email);
        $('input.password').val(data[0].password);
        prevPassword = data[0].password;
        editUserID = data[0].id;
      })
  })

  /*
for(data){
  <td>data.userId</td>
  <td><input type="button" onClick="event(data.userId);"></td>
}

  */

  $('.table').on('click', '.delete-btn', (event) => {
    event.preventDefault()
    $.get(`${API_USERS_URL}${event.target.getAttribute('data-userid')}`)
      .then(data => {

        $('.del-user-id').text(`${data[0].id}`)
        $('.del-user-first-name').text(`${data[0].first_name}`)
        $('.del-user-last-name').text(`${data[0].last_name}`)
      })
  })


  $('button.add-btn').click(event => {
    event.preventDefault();
    $('input').val('');
    $('#modal-confirm-btn').removeClass('edit-mode').addClass('add-mode');
    $('#userModalLabel').text('Add a new user');
  })

  $('#modal-close-btn').click(event => {
    event.preventDefault();
    $('input').val('');
  })


  $('input').keyup((event) => {
    $(this).val(`${event.target.value}`);
  })

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
      if ($('input.first_name').val() === '') return alert('First Name is required.')
      if ($('input.last_name').val() === '') return alert('Last Name is required.')
      if ($('input.email').val() === '') return alert('Email is required.')
      if ($('input.password').val() === '') return alert('Password is required.')
      if ($('input.confirm_password').val() === '') return alert('Confirm Password is required.')
      if ($('input.password').val() === $('input.confirm_password').val()) {
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
        })

      } else {
        alert('Please confirm/check your password!')
      }

    } else {
      // edit mode
      let alertMsg = 'Please check/confirm your password!';

      if (first_name === '') return alert('First Name is required.')
      if (last_name === '') return alert('Last Name is required.')
      if (email === '') return alert('Email is required.')
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
      })
    }
  })



  $('#delete-confirm-btn').click(() => {
    $.ajax({
      url: `${API_USERS_URL}${$('.del-user-id').text()}`,
      method: 'DELETE',
      success: window.location.reload(),
    })
  })



  $('#logout-btn').click(() => {
    $.ajax({
      url: API_LOGOUT_URL,
      method: 'GET',
      success: location.href = '/',
      xhrFields: {
        withCredentials: true
      }
    })
  })

}); //eof document ready function