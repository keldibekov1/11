import mysql from "mysql2/promise";

const db = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1212",
  database: "worl",
  waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default db;