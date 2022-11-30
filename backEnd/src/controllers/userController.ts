import express, { Request, response, Response} from 'express';
import * as argon2 from 'argon2';
import conn from '../config/Connector';

const createUsers = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;
  
  const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,15}$/;
  const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{7,63}$/;
  const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  if (!USER_REGEX.test(username)) {
    return res.status(400).json({ message: 'Nombre de usuario inválido.' });
  };

  if (!PASSWORD_REGEX.test(password)) {
    return res.status(400).json({message: 'Password inválido.'});
  }

  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ message: 'Email inválido.' });
  };
  
  if (!username || !password || !email) {
    return res.status(400).json({ message: 'All fields are required.' });
  };

  const connection = await conn();

  const duplicateName = async () => {
    const query = 'CALL sp_dupe_check(UNHEX(?), ?, ?)';
    const dupe = await connection.query(query, [process.env.DB_CUSTOMER_AUTH_KEY, username, email])
      .then((res) => {
        // @ts-ignore: Get me my values
        return res[0][0][0].id;
      });
    return dupe;
  };

  if (await duplicateName() != 0) {
    return res.status(409).json({ message: 'Usuario o email ocupado.' });
  };
  const hash = await argon2.hash(password);
  
  const createUser = async () => {
    const sql = `CALL sp_create_user(UNHEX(?), ?, ?, ?)`;
    return await connection.query(sql, [process.env.DB_CUSTOMER_AUTH_KEY!, username, hash, email]);
  };

  createUser();
  connection.end();

};

const getUsers = () => {

};

const updateUsers = () => {

};

const deleteUsers = () => {

};

const login = () => {

};

export default {
  createUsers,
  getUsers,
  updateUsers,
  deleteUsers,
  login
};