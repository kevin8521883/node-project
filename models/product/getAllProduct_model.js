const conn = require("../../api/connect_db");
module.exports = function getProductData() {
  let result = {};
  return new Promise((resolve, reject) => {
    conn.query("select * from product", function (err, rows) {
      if (err) {
        result.status = "取得訂單資料失敗";
        result.err = "伺服器錯誤，請稍後再試";
        reject(result);
        return;
      }
      resolve(rows);
    });
  });
};
