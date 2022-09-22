import * as http from 'http';

// Un mensaje de saludo según el rango de hora
const message = (): string => {
  const hour = new Date().getHours();
  if (hour >= 6 && hour <= 12) return 'Good Morning';
  if (hour >= 13 && hour <= 19) return 'Good Evening';
  return 'Good Night';
};

// Se crea el servidor web
const app = http.createServer((_req, res) => {
  res.end(message());
});

// definir un puerto
const PORT = 8082;

// escuchando los cambios en el puerto ya definido
app.listen(PORT, () => {
  console.log(`Escuchando al puerto ${PORT}`);
});
