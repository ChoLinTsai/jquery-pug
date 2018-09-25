const express = require("express");
const router = express.Router();

// Login API
router.post("/login", (req, res) => {
  let db = req.con
    , jsonData = req.body
    , getID = jsonData.user_id
    , getPW = jsonData.user_pw
    , sql = `
        SELECT
          id, COUNT(*) as total, first_name, last_name
        FROM
          users
        WHERE
          first_name = '${getID}'
          AND  password = MD5('${getPW}')
        GROUP BY
          id;
      `;

  db.query(sql, (err, results) => {
    errHandler(err);

    let getSession = results[0]
    if (results.length === 0) {
      res.sendStatus(401);
      return;
    }
    req.session.user = {
      first_name: getSession.first_name,
      last_name: getSession.last_name,
    }
    res.sendStatus(200);
  });
});

// Logout API
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.send("User cookie delete!");
});

// Error handler
function errHandler(err) {
  if (err) {
    throw err;
  }
}

module.exports = router;
