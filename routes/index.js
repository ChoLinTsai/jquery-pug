var express = require("express");
var router = express.Router();

router.get('/', (req, res) => {
  if (req.cookies.user_name !== undefined) {
    return res.redirect('/userPage')
  }
  return res.render('index')
})

router.get('/userPage', (req, res) => {
  userCheck(req, res, () => {
    let db = req.con;
    let getAllUsers = `
        SELECT
          id, first_name, last_name, email,
          date_format(created_time, '%Y-%m-%d %H:%i:%s') as created_time,
          date_format(updated_time, '%Y-%m-%d %H:%i:%s') as updated_time

        FROM
          users;
      `;

    db.query(getAllUsers, (err, result) => {
      res.render('userPage', { result });
    })
  })
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
