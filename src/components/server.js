const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 3306;

// Configurar la conexión a MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'tu_usuario_mysql',
  password: 'tu_contraseña_mysql',
  database: 'ProyectoWebMobile',
});

app.use(cors()); // Habilitar CORS
app.use(bodyParser.json()); // Parsear el cuerpo de la solicitud como JSON

// Ruta para agregar datos
app.post('/api/addData', (req, res) => {
  const { nombre, edad, fechaNacimiento } = req.body;

  if (!nombre || !edad || !fechaNacimiento) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  const query = 'INSERT INTO personas (nombre, edad, fechaNacimiento) VALUES (?, ?, ?)';
  db.query(query, [nombre, edad, fechaNacimiento], (err, result) => {
    if (err) {
      console.error('Error al agregar datos:', err);
      res.status(500).json({ error: 'Error al agregar datos' });
    } else {
      console.log('Datos agregados correctamente');
      res.json({ success: true });
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor Node.js en http://localhost:${port}`);
});
