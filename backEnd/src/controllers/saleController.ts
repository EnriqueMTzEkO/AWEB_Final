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

export default {
  sale
}