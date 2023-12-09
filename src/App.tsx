import React, { useState, useEffect } from 'react';

const App: React.FC = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    edad: '',
    fechaNacimiento: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3306/api/data');
      if (response.ok) {
        const result = await response.json();
        setData(result);
      } else {
        console.error('Error al obtener datos del servidor');
      }
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3306/api/addData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Datos enviados correctamente');
        // Actualizar la lista de datos después de enviar los nuevos datos
        fetchData();
      } else {
        console.error('Error al enviar datos al servidor');
      }
    } catch (error) {
      console.error('Error al enviar datos al servidor:', error);
    }
  };

  return (
    <div>
      <h1>Ingreso de Datos</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Edad:
          <input
            type="text"
            name="edad"
            value={formData.edad}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Fecha de Nacimiento:
          <input
            type="text"
            name="fechaNacimiento"
            value={formData.fechaNacimiento}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit">Enviar Datos</button>
      </form>
      <ul>
        {data.map((item: any) => (
          <li key={item.id}>
            {item.nombre} - {item.edad} años - {item.fechaNacimiento}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
