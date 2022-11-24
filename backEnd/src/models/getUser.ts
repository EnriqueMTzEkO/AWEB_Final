import conn from '../config/Connector';

const getUser = () => {
  
};

const query = `SELECT id, username, email, roles, active FROM USERS WHERE username = ?`;
