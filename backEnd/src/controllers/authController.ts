// @ts-nocheck
import argon2 from 'argon2';
import conn from '../config/Connector';

const getUser = async (username: string) => {
  const connection = await conn()
    .then((res) => {
      res.query('SET @user_key = UNHEX(SHA2(\'Lg3a18Fz49ZiMo0E\',512));');
      return res.query('SELECT COUNT(username), password, role FROM users WHERE username = ?', [username]);
    });
};

const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ 'message': 'Username and password are required'});
  }
  const foundUser = await getUser(username);
  console.log(foundUser);

  if (!foundUser) return res.sendStatus(401);

  const match = await argon2.verify(foundUser.password, password);

  if (match) {
    res.json({ 'success': `User ${username} is logged in.` });
  }
};

export default {
  handleLogin
}