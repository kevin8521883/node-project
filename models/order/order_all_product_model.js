const conn = require("../../api/connect_db");
module.exports = function orderProductListData(orderList) {
  let result = {};
  return new Promise((resolve, reject) => {
    conn.query("insert into order_list set ?", orderList, function (err, rows) {
      if (err) {
        result.err = "伺服器錯誤，請稍後再試";
        reject(result);
        return;
      }
      result.state = "訂單建立成功";
      resolve(result);
    });
  });
};
