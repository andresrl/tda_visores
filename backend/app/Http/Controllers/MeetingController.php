<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MeetingController extends Controller
{
    public function store(Request $request)
    {
        // Acceder a los datos enviados en la solicitud POST
        $data = $request->all();

        // Aquí puedes procesar $data como necesites
        // Por ejemplo, almacenar la información en un archivo JSON como antes

        $filePath = public_path('meetings.json');

        if (!file_exists($filePath)) {
            // Si el archivo no existe, crea un nuevo array de reuniones
            $meetings = [];
        } else {
            // Si el archivo existe, lee su contenido
            $meetingsContent = file_get_contents($filePath);
            $meetings = json_decode($meetingsContent, true) ?: [];
        }

        // Añade los nuevos datos al array de reuniones
        $meetings[] = $data;

        // Guarda el array actualizado de nuevo en el archivo
        file_put_contents($filePath, json_encode($meetings, JSON_PRETTY_PRINT));

        // Devuelve una respuesta
        return response()->json(['status' => 'success', 'message' => 'Datos guardados correctamente']);
    }
}
