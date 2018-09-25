const express = require("express");
const router = express.Router();

// Create users API listing
router.post("/users", (req, res) => {
  // userCheck(req, res, () => {
  let db = req.con,
    jsonData = req.body,
    first_name = jsonData.first_name,
    last_name = jsonData.last_name,
    password = jsonData.password,
    email = jsonData.email,

    sql = `
        INSERT INTO users (
          first_name,
          last_name,
          password,
          email
        )
        VALUES (
          '${first_name}',
          '${last_name}',
          MD5('${password}'),
          '${email}'
        );
      `;

  db.query(sql, (err, results) => {
    if (!err) {
      res.send(results);
    } else {
      res.status(400);
      console.log(111, err)
      res.send("something is wrong!");
    }
  });
  // });
});

/* GET one user API listing. */
router.get("/users/:id", (req, res) => {
  // Here to check login
  // userCheck(req, res, () => {
  // if user has cookie then get target user data
  let db = req.con,
    getUser = `
        SELECT
          *
        FROM
          users
        WHERE
          id = ${req.params.id};
      `;

  db.query(getUser, (err, rows) => {
    errHandler(err);
    let data = rows;
    res.json(data);
  });
  // });
});

// Edit user API
router.put("/users/:id", (req, res, next) => {
  // userCheck(req, res, () => {
  let db = req.con,
    jsonData = req.body,
    first_name = jsonData.first_name,
    last_name = jsonData.last_name,
    password = jsonData.password,
    email = jsonData.email,
    sql = `
        UPDATE
          users
        SET
          first_name = '${first_name}',
          last_name = '${last_name}',
          ${password === '' ? '' : `password = MD5(${password}),`}
          email ='${email}'
        WHERE
          id = ${req.params.id};
    `;

  db.query(sql, err => {
    errHandler(err);
    res.send("User data has been updated too");
  })
  // })
})



// Delete user API
router.delete("/users/:id", (req, res, next) => {
  // userCheck(req, res, () => {
  let db = req.con,
    sql = `
        DELETE FROM users
        WHERE id = ${req.params.id};
      `;

  db.query(sql, err => {
    errHandler(err);
    res.send("User has been deleted");
  });
  // });
});

// Error handler
function errHandler(err) {
  if (err) throw err;
}

// user login check
function userCheck(req, res, cb) {
  if (req.cookies.user_name === undefined) {
    return res.redirect('/');
  }
  cb();
}

module.exports = router;
