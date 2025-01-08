require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

// Configuración de CORS para permitir solicitudes solo desde tu frontend Angular
app.use(cors({
    origin: 'http://localhost:4200' 
}));

// Permitir parseo de JSON
app.use(express.json());

// Configuración de la conexión a PostgreSQL
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

// Ruta para obtener datos de la tabla usuarios desde PostgreSQL
app.get('/api/data', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM usuarios');
        res.json(result.rows);
    } catch (err) {
        res.status(500).send('Error al obtener los datos: ' + err.message);
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
