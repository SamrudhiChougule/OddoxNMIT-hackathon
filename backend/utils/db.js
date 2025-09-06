// backend/utils/db.js
import mysql from "mysql2/promise";

const pool = mysql.createPool({
    host: "localhost",
    user: "root", // change if needed
    password: "yourpassword",
    database: "ecofind",
});

export default pool;