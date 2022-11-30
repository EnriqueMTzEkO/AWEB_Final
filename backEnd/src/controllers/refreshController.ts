// @ts-nocheck
import conn from '../config/Connector';
import jwt from 'jsonwebtoken';

const getUser = async (username: string) => {
  const result = await conn()
    .then(async (res) => {
      res.query('SET @user_key = UNHEX(SHA2(\'Lg3a18Fz49ZiMo0E\',512));');
      const temp = await res.query('CALL sp_get_cookie(UNHEX(?), ?)',
          [process.env.DB_CUSTOMER_AUTH_KEY, username])
            .then((rows) => {
              res.end();
              return rows[0];
            });
      return temp;
    });
  return result[0][0];
};

const handleRefresh = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  const foundUser = await getUser(refreshToken.username);

  if (!foundUser.username) return res.sendStatus(403);
  
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
      if (err || foundUser.username !== decoded.username) {
        return res.sendStatus(403);
      }
      const accessToken = jwt.sign(
        { "username": decoded.username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
      );
      res.json({ accessToken });
    }
  );
};

export default {
  handleRefresh
}