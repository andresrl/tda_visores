// import { createServer } from 'http';
// import app from './.output/server/index.mjs';
import('./.output/server/index.mjs');

// import express from 'express';

// // const server = createServer(app);
// const port = process.env.PORT || 3001;

// // server.listen(port, () => {
// //   console.log(`Servidor Express escuchando en el puerto ${port}`);
// // });


// const app = express();

// app.get('/holamundo', (req, res) => {
//   const data = {
//     mensaje: '¡Hola, mundo!'
//   };

//   res.json(data);
// });

// app.listen(5000, () => {
//   console.log('API en ejecución en el puerto ' + 5000);
// });