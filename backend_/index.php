<?php

// // Establecer el tipo de contenido a JSON
// header('Content-Type: application/json');

// // Verificar si el método de la solicitud es POST
// if ($_SERVER['REQUEST_METHOD'] === 'POST') {
//     // Leer los datos del cuerpo de la solicitud
//     $inputData = file_get_contents('php://input');
//     $data = json_decode($inputData, true);

//     $filePath = __DIR__ . '/meetings.json';

//     // Verificar si el archivo existe y es legible
//     if (file_exists($filePath) && is_readable($filePath)) {
//         // Leer y decodificar el contenido del archivo JSON
//         $jsonContent = file_get_contents($filePath);
//         $meetings = json_decode($jsonContent, true);

//         // Verificar si hubo un error al decodificar el JSON
//         if (json_last_error() !== JSON_ERROR_NONE) {
//             http_response_code(500);
//             echo json_encode(['status' => 'error', 'message' => 'Error al parsear los datos existentes']);
//             exit;
//         }

//         // Añadir la nueva reunión al array
//         $meetings[] = $data;

//         // Intentar escribir de nuevo el array actualizado en el archivo JSON
//         if (file_put_contents($filePath, json_encode($meetings, JSON_PRETTY_PRINT)) === false) {
//             http_response_code(500);
//             echo json_encode(['status' => 'error', 'message' => 'Error al guardar los datos']);
//             exit;
//         }

//         // Responder con éxito
//         echo json_encode(['status' => 'success', 'message' => 'Datos insertados con éxito']);
//     } else {
//         // Manejar el error si el archivo no existe o no es legible
//         http_response_code(500);
//         echo json_encode(['status' => 'error', 'message' => 'Error al leer los datos existentes']);
//     }
// } else {
//     // Manejar el caso en que el método de la solicitud no sea POST
//     http_response_code(405);
//     echo json_encode(['status' => 'error', 'message' => 'Método no permitido']);
// }


// // Permitir solicitudes de cualquier origen
// header('Access-Control-Allow-Origin: *');

// // Permitir métodos específicos, como GET
// header('Access-Control-Allow-Methods: GET');

// // Permitir encabezados específicos, si es necesario (como 'Content-Type')
// header('Access-Control-Allow-Headers: Content-Type');

// // Establecer el tipo de contenido a JSON
// header('Content-Type: application/json');


// // Verificar si el método de la solicitud es GET
// if ($_SERVER['REQUEST_METHOD'] === 'GET') {
//     // Leer los datos de los parámetros de consulta
//     $data = [
//         'company_name' => $_GET['company_name'] ?? '',
//         'company_tradename' => $_GET['company_tradename'] ?? '',
//         'company_username' => $_GET['company_username'] ?? '',
//         'company_email' => $_GET['company_email'] ?? '',
//         'professional_fullname' => $_GET['professional_fullname'] ?? '',
//         'professional_company' => $_GET['professional_company'] ?? '',
//         'professional_email' => $_GET['professional_email'] ?? '',
//         'professional_sector' => $_GET['professional_sector'] ?? '',
//     ];

//     $filePath = __DIR__ . '/meetings.json';

//     // Verificar si el archivo existe y es legible
//     if (file_exists($filePath) && is_readable($filePath)) {
//         // Leer y decodificar el contenido del archivo JSON
//         $jsonContent = file_get_contents($filePath);
//         $meetings = json_decode($jsonContent, true);

//         // Verificar si hubo un error al decodificar el JSON
//         if (json_last_error() !== JSON_ERROR_NONE) {
//             http_response_code(500);
//             echo json_encode(['status' => 'error', 'message' => 'Error al parsear los datos existentes']);
//             exit;
//         }

//         // Añadir la nueva reunión al array
//         $meetings[] = $data;

//         // Intentar escribir de nuevo el array actualizado en el archivo JSON
//         if (file_put_contents($filePath, json_encode($meetings, JSON_PRETTY_PRINT)) === false) {
//             http_response_code(500);
//             echo json_encode(['status' => 'error', 'message' => 'Error al guardar los datos']);
//             exit;
//         }

//         // Responder con éxito
//         echo json_encode(['status' => 'success', 'message' => 'Datos insertados con éxito']);
//     } else {
//         // Manejar el error si el archivo no existe o no es legible
//         http_response_code(500);
//         echo json_encode(['status' => 'error', 'message' => 'Error al leer los datos existentes']);
//     }
// } else {
//     // Manejar el caso en que el método de la solicitud no sea GET
//     http_response_code(405);
//     echo json_encode(['status' => 'error', 'message' => 'Método no permitido']);
// }



if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
    header('Access-Control-Allow-Headers: token, Content-Type');
    header('Access-Control-Max-Age: 1728000');
    header('Content-Length: 0');
    header('Content-Type: text/plain');
    die();
}

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$ret = [
    'result' => 'OK',
];
print json_encode($ret);


?>
