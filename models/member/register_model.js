const conn = require("../../api/connect_db");
module.exports = function register(memberData) {
  let result = {};
  return new Promise((resolve, reject) => {
    conn.query(
      "select * from member_info where email = ?",
      memberData.email,
      function (err, rows) {
        if (err) {
          result.status = "註冊失敗";
          result.err = "伺服器錯誤，請稍後再試";
          reject(result);
          return;
        }
        if (rows.length > 0) {
          result.status = "註冊失敗";
          result.err = "已有重複的Email";
          reject(result);
        } else {
          conn.query(
            "insert into member_info set ?",
            memberData,
            function (err, rows) {
              if (err) {
                result.status = "註冊失敗";
                result.err = "伺服器錯誤，請稍後再試";
                reject(result);
                return;
              }
              result.status = "註冊成功";
              result.registerMember = memberData;
              resolve(result);
            }
          );
        }
      }
    );
  });
};
