var express = require("express");
var router = express.Router();

router.get('/', (req, res) => {
  res.render('index')
})

router.get('/userPage', (req, res) => {
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

module.exports = router;
