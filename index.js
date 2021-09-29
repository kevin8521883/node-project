const MemberModifyMethod = require("./controller/modify_controller");
const memberModifyMethod = new MemberModifyMethod();
const GetProduct = require("./controller/get_controller");
const getProduct = new GetProduct();
let express = require("express");
let app = express();
app.use(
  express.urlencoded({
    extended: true,
  })
);
const cors = require("cors");
app.use(
  cors({
    origin: ["http://localhost:8080"],
    methods: ["GET", "POST"],
  })
);
// 跨域问题解决方面
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  next();
});
const port = process.env.PORT || 8000;
app.use(express.json());

app.post("/register", memberModifyMethod.postRegister);
app.post("/login", memberModifyMethod.postLogin);
app.put("/update", memberModifyMethod.putUpdate);
app.put("/updateimg", memberModifyMethod.putUpdateImage);

app.get("/product", getProduct.getAllProduct);

app.listen(port, () => {
  console.log(port);
});

// app.post("/api/send", (req, res) => {
//   let data = {
//     name: req.body.name,
//     email: req.body.email,
//     content: req.body.content,
//   };
//   conn.query("insert into user_response set ?", data, function (err, result) {
//     if (err) {
//       res.json({
//         status: 0,
//         msg: "寄出失敗",
//       });
//     } else {
//       res.json({
//         status: 1,
//         msg: "寄出成功",
//       });
//     }
//   });
// });
// app.post("/api/register", (req, res) => {
//   const password = encryption(req.body.userPwd);
//   let data = {
//     user: req.body.userName,
//     password: password,
//     content: "",
//   };
//   conn.query(
//     "select * from user_table where user = ? and password = ?",
//     [data.user, data.password],
//     function (err, result) {
//       if (err) {
//         console.log(err);
//       } else {
//         if (result.length) {
//           res.json({
//             status: 0,
//             msg: "已被註冊",
//           });
//         } else {
//           conn.query(
//             "insert into user_table set ?",
//             data,
//             function (err, rows) {
//               if (err) {
//                 res.json({
//                   status: 0,
//                   msg: "註冊失敗",
//                 });
//               } else {
//                 res.json({
//                   status: 1,
//                   msg: "註冊成功",
//                 });
//               }
//             }
//           );
//         }
//       }
//     }
//   );
// });

// app.post("/api/login", (req, res) => {
//   let userName = req.body.userName;
//   let userPwd = req.body.userPwd;
//   if (userPwd) {
//     res.json({
//       status: 1,
//       data: {
//         userName: userName,
//         userPwd: userPwd,
//         userComputed: req.body.userName + req.body.userPwd,
//       },
//     });
//   } else {
//     res.json({
//       status: 0,
//       data: false,
//     });
//   }
// });
