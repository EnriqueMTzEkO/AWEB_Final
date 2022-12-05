/**
 * @fileoverview Sets axios default path.
 * 
 * Sets axios path to the server. As the server is configured to change
 * ports in case of error it is vital to check which port the server is
 * on, otherwise it will die.
 * 
 * It might be worth it to make a function to create the axios object,
 * then test the connection and on failure to change the base URL.
 */
import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:8008'
});