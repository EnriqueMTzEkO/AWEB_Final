import express, { Request, response, Response} from 'express';
import asyncHandler from 'express-async-handler';
import argon2 from 'argon2';
import conn from '../config/Connector';
import { IUsers } from '../models/Users';

const createUsers = async (req: Request, res: Response) => {
  const { username, password, email, roles } = req.body;

  const USER_REGEX = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
  const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  if (USER_REGEX.test(username)) {
    return res.status(400).json({ message: 'Nombre de usuario inválido.' });
  };

  if (EMAIL_REGEX.test(email)) {
    return res.status(400).json({ message: 'Email inválido.' });
  };
  
  if (!username || !password || !email || !Array.isArray(roles) || !roles.length) {
    return res.status(400).json({ message: 'All fields are required.' });
  };

  const duplicateName = async () => {
    const query = 'SELECT `username` FROM `USERS` WHERE `username` = ?';
    const users = await conn()
      .then(async (conn) => {
        const [rows] = await conn.query(query, [username])
          .then((res) => {
            conn.end();
            return res;
          });
      });
  };

  if (duplicateName.length > 0) {
    return res.status(409).json({ message: 'Duplicate username.' });
  };



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