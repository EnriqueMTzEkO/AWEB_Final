import mysql from 'mysql2/promise';

const conn = async () => {
  return await mysql.createConnection({
    host: process.env.DB_HST,
    user: process.env.DB_USR,
    password: process.env.DB_PWD,
    database: process.env.DB_URI,
    multipleStatements: false
  });
};

/*
const conn: mysql.Connection = mysql.createConnection({
  host: process.env.DB_HST,
  user: process.env.DB_USR,
  password: process.env.DB_PWD,
  database: process.env.DB_URI,
  multipleStatements: false
});
*/

export default conn;