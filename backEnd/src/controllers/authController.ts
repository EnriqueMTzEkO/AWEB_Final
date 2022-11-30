// @ts-nocheck
import * as argon2 from 'argon2';
import conn from '../config/Connector';
import jwt from 'jsonwebtoken';

const getUser = async (username: string) => {
  const result = await conn()
    .then(async (res) => {
      res.query('SET @user_key = UNHEX(SHA2(\'Lg3a18Fz49ZiMo0E\',512));');
      const temp = await res.query('CALL sp_get_credentials(UNHEX(?), ?)',
          [process.env.DB_CUSTOMER_AUTH_KEY, username])
            .then((rows) => {
              res.end();
              return rows[0];
            });
      return temp;
    });
  return result[0][0];
};

const logCookie = async (username: string, jwt: string) => {
  await conn()
    .then(async (res) => {
      res.query('SET @user_key = UNHEX(SHA2(\'Lg3a18Fz49ZiMo0E\',512));');
      await res.query('CALL sp_create_cookie(UNHEX(?), ?, ?)',
          [process.env.DB_CUSTOMER_AUTH_KEY, username, jwt]);
    })
};

const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ 'message': 'Username and password are required'});
  }
  const foundUser = await getUser(username);

  if (!foundUser.username) return res.sendStatus(401);

  const match = await argon2.verify(foundUser.password, password);

  if (!match || !foundUser.active) return res.sendStatus(401);

  if (match) {
    const accessToken = jwt.sign(
      { "username": foundUser.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1d'}
    );
    const refreshToken = jwt.sign(
      { "username": foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d'}
    );

    logCookie(foundUser.username, refreshToken);
    res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    res.json({ accessToken });
  }
};

export default {
  handleLogin
}