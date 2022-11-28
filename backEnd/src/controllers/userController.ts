import express, { Request, response, Response} from 'express';
import argon2 from 'argon2';
import conn from '../config/Connector';

const createUsers = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;

  const USER_REGEX = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
  const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{12,64}$/;
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
    const query = 'SELECT `username` FROM `USERS` WHERE `username` = ?';
    const [dupe] = await connection.query(query, [username])
      .then((res) => {
        return res;
      });
  };

  if (duplicateName.length > 0) {
    return res.status(409).json({ message: 'Duplicate username.' });
  };
  const hash = await argon2.hash(password);
  
  const createUser = async () => {
    const sql = `CALL sp_create_user(UNHEX(?), ?, ?, ?)`;
    console.log(process.env.DB_CUSTOMER_AUTH_KEY, username, hash, email);
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

export default {
  createUsers,
  getUsers,
  updateUsers,
  deleteUsers
};