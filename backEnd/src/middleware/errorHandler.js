/**
 * @fileoverview Sets middleware to get errors to a file.
 */
import logEvents from './logger';

const errorHandler = () => {
  /**
   * Registers errors to a log file.
   */
  logEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t
  ${req.headers.origin}`, 'errLog.log');
  console.log(err.stack);

  const status = res.statusCode() ? res.statusCode : 500;

  res.status(status);

  res.json({ message: err.message });
};

/** @module */
module.exports = errorHandler;