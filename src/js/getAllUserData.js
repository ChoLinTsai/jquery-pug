$(function () {
  const API_USERS_URL = 'http://localhost:3001/api/users/';

  $.get('http://localhost:3001/api/users', (data) => {

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
              class="edit-btn btn btn-warning btn-sm"
              data-userid='${data.id}'
              data-toggle="modal"
              data-target="#userModal"
            >
              Edit
            </button>
            <button class="btn btn-danger btn-sm">Delete</button>
          </td>
        </tr>`
      )
    ))
  })

  $('.table').on('click', '.edit-btn', (event) => {
    event.preventDefault()
    $('.confirm-btn').removeClass('add-mode').addClass('edit-mode');

    $.get(`${API_USERS_URL}${event.target.getAttribute('data-userid')}`)
      .then(data => {
        $('input.first_name').val(data[0].first_name)
        $('input.last_name').val(data[0].last_name)
        $('input.email').val(data[0].email)
        $('input.password').val(data[0].password)
      })
  })





  $('button.add-btn').click((event) => {
    event.preventDefault()
    $('input').val('')
    $('.confirm-btn').removeClass('edit-mode').addClass('add-mode');
  })


  $('input').keyup((event) => {
    console.log(event.target.value)
    $(this).val(`${event.target.value}`);
  })


  $('.confirm-btn').click(event => {
    event.preventDefault()

    if ($('.confirm-btn').hasClass('add-mode')) {

      // if ($('input.first_name').val() === '') return alert('First Name is required.')
      // if ($('input.last_name').val() === '') return alert('Last Name is required.')
      // if ($('input.email').val() === '') return alert('Email is required.')
      // if ($('input.password').val() === '') return alert('Password is required.')
      // if ($('input.confirm_password').val() === '') return alert('Confirm Password is required.')

      if ($('input.password').val() === $('input.confirm_password').val()) {
        let [
          first_name,
          last_name,
          email,
          password
        ] = $.map($('input'), data => {
          return data.value;
        })

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
          success: window.location.reload()
        })



      } else {
        alert('Please confirm/check your password!')
      }

    } else {

    }
  })



}); //eof document ready function