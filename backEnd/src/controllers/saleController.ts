import conn from '../config/Connector';

const sale = async (req: any, res: any) => {
  const seats: Array<{id: string, name: string, email: string, tel: number}> = req.body;
  const connection = await conn();
  connection.query('SET @user_key = UNHEX(SHA2(\'Lg3a18Fz49ZiMo0E\',512));');
  const sql = 'CALL sp_sale(UNHEX(?), UNHEX(?), ?, ?, ?)';
  seats.forEach(el => {
    connection.query(sql, [process.env.DB_CUSTOMER_AUTH_KEY, el.id, el.name, el.email, el.tel]);
  });
  
  res.json({ message: "Success" });
};

const getTicket = async (req: any, res: any) => {
  const { mode, id } = req.params;
  const connection = await conn();
  let sql: string;
  if (mode == 0) {
    sql = 'CALL sp_ticket_id(UNHEX(?), UNHEX(?))';
  } else if (mode == 1) {
    sql = 'CALL sp_ticket_user(UNHEX(?), ?)';
  } else {
    sql = 'CALL sp_ticket_email(UNHEX(?), ?)';
  }
  const results: any = await connection.query(sql, [process.env.DB_CUSTOMER_AUTH_KEY, id]);
  const out = results[0][0];

  res.json({ results: out});
};

const deleteTicket = async (req: any, res: any) => {
  const id = req.body.selection;
  const connection = await conn();
  let sql = 'CALL sp_delete_ticket(UNHEX(?), UNHEX(?))';
  const results = await connection.query(sql, [process.env.DB_CUSTOMER_AUTH_KEY, id]);

  res.json({ message: "success"});
};

export default {
  getTicket,
  deleteTicket,
  sale
}