var express = require("express");
var cors = require("cors");
var mysql = require("mysql");

var app = express();
app.use(cors()); // Bật CORS
app.use(express.json()); // Xử lý JSON

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "danhgianangluc",
  port: 3306,
});

con.connect(function (err) {
  if (err) {
    console.error("Không thể kết nối đến MySQL:", err);
    return;
  }
  console.log("Đã kết nối đến MySQL!");
});

app.get("/api/tenants", function (req, res) {
  const sql = "SELECT * FROM tenants";
  con.query(sql, function (err, results) {
    if (err) {
      console.error("Lỗi MySQL:", err);
      res.status(500).json({ message: "Không thể lấy danh sách người thuê!" });
    } else {
      res.json(results);
    }
  });
});

app.post("/api/add-room", function (req, res) {
  const { room_id, rental_type, tenant_name, phone_number, start_date } =
    req.body;

  const sql =
    "INSERT INTO tenants (room_id, rental_type, name, phone_number, start_date) VALUES (?, ?, ?, ?, ?)";
  con.query(
    sql,
    [room_id, rental_type, tenant_name, phone_number, start_date],
    function (err, result) {
      if (err) {
        console.error("Lỗi MySQL:", err);
        res.status(500).json({ message: "Thêm phòng trọ thất bại!" });
      } else {
        res.json({ message: "Thêm phòng trọ thành công!" });
      }
    }
  );
});

app.listen(3000, function () {
  console.log("Node server running @ http://localhost:3000");
});
