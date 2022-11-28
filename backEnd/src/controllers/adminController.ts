import conn from '../config/Connector';

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

export default {
  populateShows
};