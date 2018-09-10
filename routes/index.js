var express = require("express");
var router = express.Router();

router.get('/', (req, res) => {
  if (req.cookies.user_name !== undefined) {
    return res.redirect('/userPage')
  }
  return res.render('index')
})

router.get('/userPage', (req, res) => {
  // userCheck(req, res, () => {
  let db = req.con;
  let getAllUsers = `
        SELECT
          id, first_name, last_name, email,
          UNIX_TIMESTAMP(created_time) as created_time,
          UNIX_TIMESTAMP(updated_time) as updated_time

        FROM
          users;
      `;

  db.query(getAllUsers, (err, result) => {
    res.render('userPage', { result });
  })
  // })
})

// user login check
function userCheck(req, res, cb) {
  let getCookieUser = req.cookies.user_name;
  if (getCookieUser === undefined) {
    return res.redirect('/');
  }
  cb();
}

module.exports = router;
