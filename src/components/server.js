// server.js
const cors = require('cors');
const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3306;  // Cambié el puerto a 3001

// Configurar la conexión a MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'david',
  password: '123456789',
  database: 'ProyectoWebMobile',
});

db.connect(err => {
  if (err) {
    console.error('Error de conexión a MySQL:', err);
  } else {
    console.log('Conexión a MySQL exitosa');
  }
});

// Middleware CORS (colocado antes de las rutas)
app.use(cors());

// Endpoint para obtener datos de MySQL
app.get('/api/data', (req, res) => {
  db.query('SELECT * FROM personas', (err, result) => {
    if (err) {
      console.error('Error al consultar MySQL:', err);
      res.status(500).json({ error: 'Error al consultar MySQL' });
    } else {
      res.json(result);
    }
  });
});

// Endpoint para agregar datos a MySQL
app.post('/api/addData', (req, res) => {
  // Lógica para agregar datos a la base de datos
});

app.listen(port, () => {
  console.log(`Servidor Node.js en http://localhost:${port}`);
});
