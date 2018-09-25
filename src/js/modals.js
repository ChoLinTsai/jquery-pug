const API_USERS_URL = 'http://localhost:3000/api/users/';
const FILE_DOWNLOAD_URL = 'http://localhost:3000/file/fileDownload/';
const FILE_DELETE_URL = 'http://localhost:3000/file/fileDelete/';

// open edit and get target user data
const editUserModal = (event, userID) => {
  event.preventDefault();
  $('#modal-confirm-btn').removeClass('add-mode').addClass('edit-mode');
  $('#userID, #basic-addon6').removeClass('d-none');
  $('#userModalLabel').text('Edit user data');
  $.get(`${API_USERS_URL}${userID}`)
    .then(data => {
      let getData = data[0];
      $('#first_name').val(getData.first_name);
      $('#last_name').val(getData.last_name);
      $('#email').val(getData.email);
      $('#password').val(getData.password);
      $('#userID').val(getData.id);
      // prevPassword
      $('#password').attr('data-prevpassword', getData.password);
    })
    .fail(() => alert('Failed to fetch user data.'));
}

// open delete modal and get target user data
const deleteUserModal = (event, userID) => {
  event.preventDefault();
  $.get(`${API_USERS_URL}${userID}`)
    .then(data => {
      let getData = data[0];
      $('#del-user-id').text(`${getData.id}`)
      $('#del-user-first-name').text(`${getData.first_name}`)
      $('#del-user-last-name').text(`${getData.last_name}`)
    })
    .fail(() => alert('Failed to fetch user data.'));
}

const deleteFile = (event, item) => {
  event.preventDefault();
  let confirmDelete = confirm('Are you sure you want to delete this file?')

  if (confirmDelete === true) {
    $.ajax({
      url: `${FILE_DELETE_URL}${item}`,
      method: 'DELETE',
      success: window.location.reload(),
      error: err => {
        if (err) return alert('File delete failed!');
      },
    });
    return;
  } else return
}

module.exports = {
  editUserModal,
  deleteUserModal,
  deleteFile,
}