import conn from '../../config/Connector';

const dupes = async (mode: number, column: string) => {
  let query: string = '';
  switch (mode) {
    case 0:
      query = 'SELECT COUNT(`username`) AS Number from `USERS` WHERE `username` = ?';
      break;
    case 1:
      query = 'SELECT COUNT(`email`) AS Number from `USERS` WHERE `email` = ?';
      break;
    default:
      break;
  };
  const users = await conn()
    .then(async (conn) => {
      const [row] = await conn.query(query, [column])
        .then((res) => {
          conn.end();
          console.log(res);
          return res;
        });
    });
};