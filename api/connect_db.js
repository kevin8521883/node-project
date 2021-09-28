const mysql = require("mysql");
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "demo_nodejs",
  port: 3306,
});
conn.connect((err) => {
  if (err) {
    console.log("connecting error");
  } else {
    console.log("connecting success");
  }
});
module.exports = conn;
