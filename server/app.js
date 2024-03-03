const express = require("express");
const multer = require("multer");
// const sharp = require('sharp');
const XLSX = require("xlsx");
// const FTP = require('ftp');
const { Client } = require("ssh2");
const fs = require("fs");
const path = require("path");
const cors = require("cors"); // CORS

const app = express();

app.use(cors()); // Habilitar CORS para todas las rutas
app.use("/fotos", express.static(path.join(__dirname, "fotos")));
app.use("/videos", express.static(path.join(__dirname, "videos")));

app.use(express.json()); // Para parsear el cuerpo de las solicitudes como JSON

app.get("/api/ping", (req, res) => {
  const data = true;
  res.json(data);
});

app.get("/api/get-goli-data", (req, res) => {
  const localPath = "goli.xlsx";
  try {
    const workbook = XLSX.readFile(localPath);
    const sheetName = workbook.SheetNames[0];
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
    res.json(data);
  } catch (e) {
    console.error("Excel Processing Error:", e);
    res.status(500).send("Error al procesar el archivo Excel");
  }
});

app.get("/api/get-goli-2-data", (req, res) => {
  const localPath = "goli-2.xlsx";
  try {
    const workbook = XLSX.readFile(localPath);
    const sheetName = workbook.SheetNames[0];
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
    res.json(data);
  } catch (e) {
    console.error("Excel Processing Error:", e);
    res.status(500).send("Error al procesar el archivo Excel");
  }
});

app.get("/api/fotos", (req, res) => {
  const fotosDir = path.join(__dirname, "/fotos");
  fs.readdir(fotosDir, (err, files) => {
    if (err) {
      res.status(500).send("Error al leer la carpeta de fotos");
      return;
    }
    const jpgFiles = files.filter((file) => file.endsWith(".jpg"));
    res.json(shuffleArray(jpgFiles)); // Envía los archivos mezclados
  });
});

app.get("/api/videos", (req, res) => {
  const fotosDir = path.join(__dirname, "/videos");
  fs.readdir(fotosDir, (err, files) => {
    if (err) {
      res.status(500).send("Error al leer la carpeta de videos");
      return;
    }
    const mp4Files = files.filter((file) => file.endsWith(".mp4"));
    res.json(shuffleArray(mp4Files)); // Envía los archivos mezclados
  });
});



//Conexión a bases de datos en Node.js
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'abb_and_info_db1',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD|| 'root',
});

//Conexión a bases de datos en Node.js
connection.connect((err) => {
  if (err) {
    console.error('Error de conexión: ', err.stack);
    return;
  }
  console.log('¡Conexión exitosa a la base de datos MySQL!');
});


app.post("/api/save-meeting", (req, res) => {
  // Extraer los datos del cuerpo de la solicitud
  const { company_name, company_tradename, company_username, company_email, professional_fullname, professional_company, professional_email, professional_sector } = req.body;

  // Definir la consulta SQL utilizando parámetros para evitar inyecciones SQL
  const consultaSQL = 'INSERT INTO meetings (company_name, company_tradename, company_username, company_email, professional_fullname, professional_company, professional_email, professional_sector) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

  // Ejecutar la consulta SQL con los datos recibidos
  connection.query(consultaSQL, [company_name, company_tradename, company_username, company_email, professional_fullname, professional_company, professional_email, professional_sector], (err, resultados) => {
    if (err) {
      console.error('Error al ejecutar la consulta INSERT: ', err.stack);
      res.status(500).send('Error al ejecutar la consulta');
      return;
    }
    console.log('Resultados de la consulta INSERT: ', resultados);
    res.send('Datos insertados con éxito');
  });
});



app.post("/api/save-meeting-json", (req, res) => {
  // Extraer los datos del cuerpo de la solicitud
  const { company_name, company_tradename, company_username, company_email, professional_fullname, professional_company, professional_email, professional_sector } = req.body;

  // Definir la ruta del archivo JSON donde se guardarán los datos
  const filePath = path.join(__dirname, 'meetings.json');

  // Leer el archivo JSON actual
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error('Error al leer el archivo: ', err);
      res.status(500).send('Error al leer los datos existentes');
      return;
    }

    // Parsear los datos existentes o iniciar un nuevo array si el archivo está vacío
    const meetings = data.length ? JSON.parse(data) : [];

    // Añadir la nueva reunión al array
    meetings.push({ company_name, company_tradename, company_username, company_email, professional_fullname, professional_company, professional_email, professional_sector });

    // Escribir de nuevo el array actualizado en el archivo JSON
    fs.writeFile(filePath, JSON.stringify(meetings, null, 2), (err) => {
      if (err) {
        console.error('Error al escribir en el archivo: ', err);
        res.status(500).send('Error al guardar los datos');
        return;
      }

      console.log('Datos insertados con éxito');
      res.send('Datos insertados con éxito');
    });
  });
});

app.get("/api/get-meetings", (req, res) => {
  // Extraer los datos de la URL
  const { company_name, company_tradename, company_username, company_email, professional_fullname, professional_company, professional_email, professional_sector } = req.query;

  // Aquí puedes usar estos valores para filtrar tus resultados si es necesario
  // Por ejemplo, modificando la consultaSQL para incluir condiciones WHERE basadas en los valores recibidos

  const consultaSQL = 'SELECT * FROM meetings'; // Modifica esta consulta según tus necesidades

  connection.query(consultaSQL, (err, resultados) => {
    if (err) {
      console.error('Error al ejecutar la consulta SELECT: ', err.stack);
      res.status(500).send('Error al ejecutar la consulta');
      return;
    }
    console.log('Resultados de la consulta SELECT: ', resultados);
    // Aquí podrías querer enviar los resultados reales en lugar de un mensaje genérico
    res.json(resultados);
  });
});

const PORT = 4003;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
