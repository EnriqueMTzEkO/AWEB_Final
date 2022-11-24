/**
 * @fileoverview Middleware para generar logs.
 * 
 * @author Mauricio López Cházaro
 * 
 * @license MIT
*/
import fs from 'fs';
import fsPromises from 'fs/Promises';
import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import path from 'path';

const logEvents = async (message, logFileName) => {
  /**
   * Registra un evento en un archivo de bitácora.
   * 
   * @param {string} message Mensaje generado por el evento registrado.
   * @param {string} logFileName
   */
  const dateTime = `${new Date(), 'yyyyMMdd\tHH:mm:ss'}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}`;

  try {
    if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
      await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
    }
    await fsPromises.appendFile(path.join(__dirname, '..', 'logs',logFileName),
        logItem);
  } catch (error) {
    console.log(error);
  }
};

const logRequests = (req, res, next) => {
  /**
   * Middleware to log requests.
   */
  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log');
  console.log(`${req.method} ${req.path}`);
  next();
};

/** @module */
module.exports = {
  logEvents,
  logRequests
}