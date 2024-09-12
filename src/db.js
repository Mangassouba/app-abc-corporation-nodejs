const mysql = require("mysql2/promise");

// Create the connection pool. The pool-specific settings are the defaults
const connPool = mysql.createPool({
  host: "localhost",
  user: "root",
  port: "3306",
  password: "isik@passer.com",
  database: "order_manager",
  // waitForConnections: true,
  connectTimeout: false,
  // connectionLimit: 10000000,
});

connPool.getConnection().then(() => {
  console.log("CONNECTED");
});
module.exports = connPool;
