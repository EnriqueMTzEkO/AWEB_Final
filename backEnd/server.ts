/**
 * Archivo principal del backend, contiene la llamada a las demás funciones.
 * 
 * Descripción más a detalle va aquí
 */
 // imports
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';

// Custom import
import corsOptions from './src/config/corsOptions';
 
// Declaración de variables
const server = express();
const PORT = process.env.PORT || 8009;
 
// Middleware Setup
server.use(cors(corsOptions));
server.use(express.json());
server.use(cookieParser());

// Static file serve
const publicDir = path.join(__dirname, 'public');
server.use('/static', express.static(publicDir));

// Router
// Unverified Routes
server.use('/', require('./src/routes/root'));
server.use('/user', require('./src/routes/userRoutes'));
server.use('/logout', require('./src/routes/logout'));
server.use('/resources', require('./src/routes/hallRoute'));
server.use('/admin', require('./src/routes/adminRoutes'));

// I'll verify these later
server.use('/movies', require('./src/routes/moviesRoute'));

// Verified Routes
server.use('/auth', require('./src/routes/refresh'));
server.use('/refresh', require('./src/routes/refresh'));
 
server.listen(PORT, () => console.log(`Server running on port ${PORT}.`));