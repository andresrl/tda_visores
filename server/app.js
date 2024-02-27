const express = require('express');
const multer = require('multer');
// const sharp = require('sharp');
const XLSX = require('xlsx');
// const FTP = require('ftp');
const { Client } = require('ssh2');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // CORS

const app = express();

app.use(cors()); // Habilitar CORS para todas las rutas
app.use('/fotos', express.static(path.join(__dirname, 'fotos')));
app.use('/videos', express.static(path.join(__dirname, 'videos')));

app.get('/api/ping', (req, res) => {
  const data = true;
  res.json(data);
});

app.get('/api/get-goli-data', (req, res) => {
  const localPath = 'goli.xlsx';
  try {
    const workbook = XLSX.readFile(localPath);
    const sheetName = workbook.SheetNames[0];
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
    res.json(data);
  } catch (e) {
    console.error('Excel Processing Error:', e);
    res.status(500).send('Error al procesar el archivo Excel');
  }
});

app.get('/api/fotos', (req, res) => {
  const fotosDir = path.join(__dirname, '/fotos');
  fs.readdir(fotosDir, (err, files) => {
    if (err) {
      res.status(500).send('Error al leer la carpeta de fotos');
      return;
    }
    const jpgFiles = files.filter(file => file.endsWith('.jpg'));
    res.json(shuffleArray(jpgFiles)); // Envía los archivos mezclados
  });
});

app.get('/api/videos', (req, res) => {
  const fotosDir = path.join(__dirname, '/videos');
  fs.readdir(fotosDir, (err, files) => {
    if (err) {
      res.status(500).send('Error al leer la carpeta de videos');
      return;
    }
    const mp4Files = files.filter(file => file.endsWith('.mp4'));
    res.json(shuffleArray(mp4Files)); // Envía los archivos mezclados
  });
});



// Configurar almacenamiento de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
      cb(null, 'fotos/');
    } else if (file.mimetype.startsWith('video')) {
      cb(null, 'videos/');
    } else {
      cb({ error: 'Tipo de archivo no soportado' }, false);
    }
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Rutas para cargar imágenes y videos
// app.post('/api/fotos', upload.array('images'), async (req, res) => {
//   try {
//     req.files.forEach(async (file) => {
//       await sharp(file.path)
//         .resize(800) // Cambiar según la necesidad
//         .jpeg({ quality: 80 })
//         .toFile(path.join('fotos/', 'optimized-' + file.filename));
//     });
//     res.send('Imágenes cargadas y procesadas');
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// app.post('/api/videos', upload.array('videos'), (req, res) => {
//   // Aquí podrías agregar procesamiento de videos si es necesario
//   res.send('Videos cargados');
// });

// app.get('/api/images', (req, res) => {
//   const fotosDir = path.join(__dirname, '/fotos');
//   fs.readdir(fotosDir, (err, files) => {
//     if (err) {
//       res.status(500).send('Error al leer el directorio de imágenes');
//     } else {
//       res.json(files);
//     }
//   });
// });

// app.get('/api/videos', (req, res) => {
//   const videosDir = path.join(__dirname, '/videos');
//   fs.readdir(videosDir, (err, files) => {
//     if (err) {
//       res.status(500).send('Error al leer el directorio de videos');
//     } else {
//       res.json(files);
//     }
//   });
// });


function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}



const PORT = 4003;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});