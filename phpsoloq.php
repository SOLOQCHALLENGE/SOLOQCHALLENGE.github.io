<?php

// Endpoint de la API de Riot Games
$endpoint = 'https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/';

// Array de nombres de invocador
$summonerNames = 'sumiguelito19'

// Clave de la API de Riot Games
$apiKey = 'RGAPI-d2463f55-2335-49f1-ad52-12450c94df1a';

// Array para almacenar los resultados
$results = [];

// Recorrer cada nombre de invocador y realizar la solicitud a la API
foreach ($summonerNames as $summonerName) {
  // URL de la solicitud
  $url = $endpoint . urlencode($summonerName) . '?api_key=' . $apiKey;

  // Realizar la solicitud a la API
  $response = file_get_contents($url);

  // Retornar la respuesta como JSON y agregarla al array de resultados
  $results[] = json_decode($response);
}

// Retornar los resultados como JSON
header('Content-Type: application/json');
echo json_encode($results);

?>
