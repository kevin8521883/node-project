const conn = require("../../api/connect_db");
module.exports = function update(id, memberData) {
  let result = {};
  return new Promise((resolve, reject) => {
    conn.query(
      "update member_info set ? where id = ?",
      [memberData, id],
      function (err, rows) {
        if (err) {
          result.status = "會員資料更新失敗";
          result.err = "伺服器錯誤，請稍後再試";
          reject(result);
          return;
        }
        result.status = "會員資料更新成功";
        result.updateMember = memberData;
        resolve(result);
      }
    );
  });
};
