const toRegister = require("../models/member/register_model");
const toLogin = require("../models/member/login_model");
const toUpdate = require("../models/member/update_model");
const Check = require("../api/check");
const encryption = require("../api/encryption");
const jwt = require("jsonwebtoken");
const verification = require("../api/verification");
const formidable = require("formidable");
const fs = require("fs");

check = new Check();
module.exports = class Member {
  postRegister(req, res, next) {
    const password = encryption(req.body.password);
    const memberData = {
      name: req.body.name,
      email: req.body.email,
      password: password,
      create_date: onTime(),
    };
    const checkEmail = check.checkEmail(memberData.email);
    if (!checkEmail) {
      res.json({
        status: "註冊失敗",
        err: "請輸入正確的Email格式。(如1234@com.tw)",
      });
    } else {
      toRegister(memberData)
        .then((result) => {
          res.json({
            result: result,
          });
        })
        .catch((err) => {
          res.json({
            err: err,
          });
        });
    }
  }
  postLogin(req, res, next) {
    const password = encryption(req.body.password);
    const memberData = {
      email: req.body.email,
      password: password,
    };
    toLogin(memberData).then((rows) => {
      if (rows.length > 0) {
        const token = jwt.sign(
          {
            alg: "HS256",
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
            data: rows[0].id,
          },
          "my_token"
        );
        res.setHeader("token", token);
        res.json({
          result: {
            status: "登入成功",
            loginMember: rows[0].name,
          },
        });
      } else {
        res.json({
          result: {
            status: "登入失敗",
            err: "請輸入正確帳號或密碼",
          },
        });
      }
    });
  }
  putUpdate(req, res, next) {
    const token = req.headers["token"];
    if (token) {
      verification(token).then((tokenResult) => {
        if (tokenResult) {
          const id = tokenResult;
          const password = encryption(req.body.password);
          const memberData = {
            name: req.body.name,
            password: password,
            update_time: onTime(),
          };
          toUpdate(id, memberData)
            .then((result) => {
              res.json({
                result: result,
              });
            })
            .catch((err) => {
              res.json({
                err: err,
              });
            });
        } else {
          res.json({
            result: {
              status: "token錯誤",
              err: "請重新登入",
            },
          });
        }
      });
    } else {
      res.json({
        result: {
          err: "請輸入token",
        },
      });
    }
  }
  putUpdateImage(req, res, next) {
    const token = req.headers["token"];
    if (token) {
      verification(token).then((tokenResult) => {
        if (tokenResult) {
          const form = new formidable.IncomingForm();
          form.parse(req, function (err, fields, files) {
            if (check.checkFileSize(files.file.size) === false) {
              res.json({
                result: {
                  status: "上傳失敗",
                  err: "請上傳小於1MB的檔案",
                },
              });
              return;
            }
            if (check.checkFileType(files.file.type) === false) {
              res.json({
                result: {
                  status: "上傳失敗",
                  err: "請選擇正確的檔案格式。如：png, jpg, jpeg等。",
                },
              });
              return;
            }
            toBase64(files.file.path)
              .then((result) => {
                const memberData = {
                  img: result,
                  img_name: files.file.name,
                  update_time: onTime(),
                };
                const id = tokenResult;
                toUpdate(id, memberData)
                  .then((updateResult) => {
                    res.json({
                      result: updateResult,
                    });
                  })
                  .catch((err) => {
                    res.json({
                      err: err,
                    });
                  });
              })
              .catch((err) => {
                res.json({
                  img: err,
                });
              });
          });
        } else {
          res.json({
            result: {
              status: "token錯誤",
              err: "請重新登入",
            },
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

const toBase64 = function (filepath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, "base64", function (err, data) {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
};
