// @ts-nocheck
import conn from '../config/Connector';
/* 
const populateShows = async (days: number) => {
  const connection = await conn();
  let sql = `SELECT * FROM showings WHERE DATE(start) IN (SELECT DATE(max(start)) FROM showings)`;
  connection.query(sql, function (err: any, res: any, fields: any) {
    for (let i = 1; i < days; i++) {
      let sql = `INSERT INTO showings SELECT(guuid(), DATE_ADD(start, INTERVAL ? DAYS), DATE_ADD(end, INTERVAL ? DAYS), MV_id, hall)`;
      connection.query(sql,[i, i-1]);
    }
  });
};
*/

const allSeats = async () => {
  const connection = await conn();
  let sql = 'CALL sp_all_shows()';
  // @ts-ignore: A
  const temp = await connection.query(sql);
  const show = temp[0][0];
  show.forEach(element => {
    for (let i = 1; i < 12; i++) {
      for (let j = 1; j < 5; j++) {
        let sql = 'CALL sp_seater(?, ?, ?);'
        connection.query(sql, [element.id, i, j]);
      }
    }
  })
  connection.end();
};

export default {
  allSeats
};