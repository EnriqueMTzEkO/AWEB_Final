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
 
 // Custom import
 import corsOptions from './src/config/corsOptions';
 import { ServerResponse } from 'http';
 
 // Declaración de variables
 const server = express();
 const PORT = process.env.PORT || 8009;
 
 // Middleware Setup
 server.use(cors(corsOptions));
 server.use(express.json());
 
 // Router
 
 server.listen(PORT, () => console.log(`Server running on port ${PORT}.`));