const conn = require("../../api/connect_db");
module.exports = function login(memberData) {
  let result = {};
  return new Promise((resolve, reject) => {
    conn.query(
      "select * from member_info where email = ? and password = ?",
      [memberData.email, memberData.password],
      function (err, rows) {
        if (err) {
          result.status = "登入失敗";
          result.err = "伺服器錯誤，請稍後再試";
          reject(err);
          return;
        }
        resolve(rows);
      }
    );
  });
};
