const productData = require("../models/product/getAllProduct_model");

module.exports = class GetProduct {
  getAllProduct(req, res, next) {
    productData()
      .then((result) => {
        res.json({
          result: result,
        });
      })
      .catch((err) => {
        res.json({
          result: err,
        });
      });
  }
};
