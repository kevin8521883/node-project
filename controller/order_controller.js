const toOrder = require("../models/order/order_all_product_model");
const verify = require("../api/verification");
module.exports = class OrderList {
  orderListData(req, res, next) {
    const token = req.header["token"];
    if (!token) {
      res.json({
        err: "請輸入token",
      });
    } else {
      verify(token).then((tokenResult) => {
        if (!tokenResult) {
          res.json({
            status: "token錯誤",
            err: "請重新登入",
          });
        } else {
          const memberID = tokenResult;
          const orderData = {
            orderId: memberID,
            productId: req.body.productId,
            quantity: req.body.quantity,
            orderDate: onTime(),
          };
          toOrder(orderData)
            .then((result) => {
              res.json({
                result: result,
              });
            })
            .catch((err) => {
              res.json({
                error: err,
              });
            });
        }
      });
    }
  }
};

const onTime = function () {
  let date = new Date();
  let yy = date.getFullYear();
  let mm = date.getMonth() + 1;
  let dd = date.getDate();
  let hh = date.getHours();
  let mi = date.getMinutes();
  let ss = date.getSeconds();
  // mm = (mm <= 9 ? "0" : "") + mm;
  mm = (mm > 9 ? "" : "0") + mm;
  dd = (dd > 9 ? "" : "0") + dd;
  hh = (hh > 9 ? "" : "0") + hh;
  mi = (mi > 9 ? "" : "0") + mi;
  ss = (ss > 9 ? "" : "0") + ss;
  return `${yy}-${mm}-${dd} ${hh}:${mi}:${ss}`;
};
