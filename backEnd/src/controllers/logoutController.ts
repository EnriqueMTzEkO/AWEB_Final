// @ts-nocheck
import conn from '../config/Connector';
import jwt from 'jsonwebtoken';

const deleteToken = async (username: string, cookie) => {
  const result = await conn()
    .then(async (res) => {
      res.query('SET @user_key = UNHEX(SHA2(\'Lg3a18Fz49ZiMo0E\',512));');
      const temp = await res.query('CALL sp_delete_cookie(UNHEX(?), ?, ?)',
          [process.env.DB_CUSTOMER_AUTH_KEY, username, cookie])
            .then((rows) => {
              res.end();
              return rows[0];
            });
      return temp;
    });
  return result[0][0];
};

const handleLogOut = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;

  const foundUser = await deleteToken(refreshToken.username, refreshToken);

  if (!foundUser.username) {
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    return res.sendStatus(204);
  };


};

export default {
  handleLogOut
}