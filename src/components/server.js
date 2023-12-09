const cors = require('cors');
const express = require('express');
const mysql = require('mysql');
const path = require('path');

const app = express();
const port = 3306;

// Configurar la conexión a MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'david',
  password: '123456789',
  database: 'WebMobile',
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

// Endpoint de ejemplo para obtener datos de MySQL
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

// Sirve archivos estáticos desde la carpeta 'public' (o ajusta según tu estructura)
app.use(express.static(path.join(__dirname, 'public')));

// Configuración para manejar rutas no definidas (debe estar al final)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Servidor Node.js en http://localhost:${port}`);
});
