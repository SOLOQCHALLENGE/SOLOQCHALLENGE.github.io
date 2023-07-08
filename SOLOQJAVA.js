
 // API key
const RiotApiKey = "RGAPI-d2463f55-2335-49f1-ad52-12450c94df1a";

// Servidor
const server = "euw1";

// Jugadores del SoloQChallenge
const players = ["HuevitoMiDiosa", "huevovacio", "SuckMyLickilicky", "SuckMyUmbreon", "Moco Semεnpai", "SuckMyMush00m", "sumiguelito19", "Sususupport", "falo de latex", "Hî Îm Xâyâh", "Manguitos1", "yasuoitorl", "High0nABush", "Vasilotind", "Tipparnayam","HeartBreakBuffs","ElAfiladorSeñora", "SamiCOPPERseeker","SuckMyCiego", "Rësët"];

// Función principal
function main() {
  // Obtener referencia al cuerpo de la tabla
  var tbody = document.getElementById("jugadores-body");

  // Crear matriz de datos de cada jugador
  var datosJugadores = new Array(players.length);

  // Rellenar matriz de datos de cada jugador
  for (var i = 0; i < players.length; i++)
    datosJugadores[i] = obtenerDatosDeJugador(i);

  // Ordenar matriz de datos en función de los puntos
  var cambiado;
  do {
    cambiado = false;
    for (var i = 0; i < datosJugadores.length - 1; i++) {
      if (datosJugadores[i][10] < datosJugadores[i + 1][10]) {
        var tmp = datosJugadores[i];
        datosJugadores[i] = datosJugadores[i + 1];
        datosJugadores[i + 1] = tmp;
        cambiado = true;
      }
    }
  } while (cambiado);

  // Construir filas de jugadores
  for(var i = 0; i < datosJugadores.length; i++) {
    // Crear fila
    var fila = document.createElement("tr");

    // Posición
    var posicion = document.createElement("td");
    posicion.textContent = i + 1 + "º";
    fila.appendChild(posicion);

    // Nombre
    var nombre = document.createElement("td");
    if(datosJugadores[i][datosJugadores[i].length-1] == -1)
      nombre.textContent = datosJugadores[i][0] + " ✘";
    else
     nombre.textContent = datosJugadores[i][0];
    fila.appendChild(nombre);

    // LPS
    var lps = document.createElement("td");
    lps.textContent = datosJugadores[i][1];
    lps.style.fontWeight = "bold";
    fila.appendChild(lps);

    // Victorias
    var victorias = document.createElement("td");
    victorias.textContent = datosJugadores[i][2];
    fila.appendChild(victorias);

    // Derrotas
    var derrotas = document.createElement("td");
    derrotas.textContent = datosJugadores[i][3];
    fila.appendChild(derrotas);

    // Partidas
    var partidas = document.createElement("td");
    partidas.textContent = datosJugadores[i][4];
   fila.appendChild(partidas);

    // Winrate
    var winrate = document.createElement("td");
    winrate.textContent = datosJugadores[i][6];
    fila.appendChild(winrate);

    // OP.GG
    var opgg = document.createElement("td");
    opgg.innerHTML = datosJugadores[i][7];
    fila.appendChild(opgg);

    // Twitch
    var twitch = document.createElement("td");
    twitch.innerHTML = datosJugadores[i][8];
    fila.appendChild(twitch);

    // Estado Twitch
    var estadoTwitch = document.createElement("td");
    estadoTwitch.textContent = datosJugadores[i][9];
    fila.appendChild(estadoTwitch);

    // Puntuación
    var puntuacion = document.createElement("td");
    puntuacion.textContent = datosJugadores[i][10];
    fila.appendChild(puntuacion);

    // Agregar fila al cuerpo de la tabla
    tbody.appendChild(fila);
  }


}
// Llamada a la función principal

// DatosTwitch
    function getTwitchChannel(summonerName) {
        switch (summonerName) {
          case "Moco Semεnpai":
            return '<a href="https://www.twitch.tv/moco_senpai" target="_blank">moco_senpai</a>';
          case "sumiguelito19":
            return '<a href="https://www.twitch.tv/miguesu" target="_blank">miguesu</a>';
          case "Manguitos1":
            return '<a href="https://www.twitch.tv/IamMerkus" target="_blank">IamMerkus</a>';
          case "Hî Îm Xâyâh":
            return '<a href="https://www.twitch.tv/sadow_s" target="_blank">Sadow_S</a>';
          case "High0nABush":
            return '<a href="https://www.twitch.tv/DonTTVon" target="_blank">DonTTVon</a>';
          case "Tipparnayam":
            return '<a href="https://kick.com/klausstreamss" target="_blank">klausstreamss</a>';
          case "SuckMyUmbreon":
            return '<a href="https://www.twitch.tv/kratos3574" target="_blank">kratos3574</a>';
          default:
            return "";
        }
      }
      
      function getTwitchStatus(summonerName) {
        switch (summonerName) {
          case "Moco Semεnpai":
            return isTwitchChannelOnline("moco_senpai") ? "LIVE" : "OFFLINE";
          case "sumiguelito19":
            return isTwitchChannelOnline("miguesu") ? "LIVE" : "OFFLINE";
          case "Manguitos1":
            return isTwitchChannelOnline("IamMerkus") ? "LIVE" : "OFFLINE";
          case "Hî Îm Xâyâh":
            return isTwitchChannelOnline("Sadow_S") ? "LIVE" : "OFFLINE";
          case "High0nABush":
            return isTwitchChannelOnline("DonTTVon") ? "LIVE" : "OFFLINE";
          case "SuckMyUmbreon":
            return isTwitchChannelOnline("kratos3574") ? "LIVE" : "OFFLINE";
          default:
            return "";
        }
      }
      
      function isTwitchChannelOnline(channelName) {
        var clientId = "oekg6jv9a7wy1uk4uhahbuhdripaig"; // Reemplaza con tu propio Client ID de la API de Twitch
        var apiUrl = "https://api.twitch.tv/helix/streams?user_login=" + channelName;
      
        var options = {
          method: "GET",
          headers: {
            "Client-ID": clientId,
            "Authorization": "Bearer " + getTwitchAccessToken() // Obtén un Access Token de Twitch
          }
        };
      
        fetch(apiUrl, options)
          .then(response => response.json())
          .then(data => {
            return data.data.length > 0;
          })
          .catch(error => {
            console.error("Error: ", error);
            return false;
          });
      }
      
      function getTwitchAccessToken() {
        var clientId = "oekg6jv9a7wy1uk4uhahbuhdripaig"; // Reemplaza con tu propio Client ID de la API de Twitch
        var clientSecret = "rt3oepd37eaync4fzp76ibcbttsjtm"; // Reemplaza con tu propio Client Secret de la API de Twitch
        
        var tokenUrl = "https://id.twitch.tv/oauth2/token" +
          "?client_id=" + clientId +
          "&client_secret=" + clientSecret +
          "&grant_type=client_credentials";
        
        var response = UrlFetchApp.fetch(tokenUrl, {method: "POST"});
        var data = JSON.parse(response.getContentText());
        
        return data.access_token;
      }


    function obtenerDatosDeJugador(indice, datosOcultos) {
        var summonerName = players[indice];
        var url = "https://" + server + ".api.riotgames.com/lol/summoner/v4/summoners/by-name/" + encodeURIComponent(summonerName) + "?api_key=" + RiotApiKey;
      
        return fetch(url)
          .then(response => response.json())
          .then(summonerData => {
            var summonerId = summonerData.id;
            var url = "https://" + server + ".api.riotgames.com/lol/league/v4/entries/by-summoner/" + encodeURIComponent(summonerId) + "?api_key=" + RiotApiKey;
      
            return fetch(url)
              .then(response => response.json())
              .then(leagueData => {
                // Resto de la lógica para obtener los datos del jugador
                // ...
                // ...
                // Devolver el array de datos como promesa resuelta
                return stats;
              });
          })
          .catch(error => {
            console.error("Error: ", error);
          });
      
      
        // Esperar para evitar bloqueos
        Utilities.sleep(50);
        
        // Id del jugador
        var summonerId = summonerData.id;
        
        url = "https://" + server + ".api.riotgames.com/lol/league/v4/entries/by-summoner/" + encodeURIComponent(summonerId) + "?api_key=" + RiotApiKey;
        response = UrlFetchApp.fetch(url);
        var leagueData = JSON.parse(response.getContentText());
      
        // Esperar para evitar bloqueos
        Utilities.sleep(50);
      
        // Datos de jugador por apartados
        var rank = "SIN CLASIFICAR";
        var lps = 0;
        var wins = 0;
        var losses = 0;
        var totalGames = 0;
        var winrate = "No definido";
        var puntuacion = 0;
      
        // Calcular Maximo
        var maximo = maximoPartidas();
        
        // Rellenar datos de cada apartado
        var encontrado = false;
        for (var i = 0; i < leagueData.length && !encontrado; i++){
      
          // Buscar en todas sus ligas hasta encontrar Soloq
          if(leagueData[i].queueType == "RANKED_SOLO_5x5")
          {
      
            // Se ha encontrado la cola de Soloq
            encontrado = true;
      
            // Traducir
            var tier = leagueData[i].tier;
            switch(tier)
            {
              case "IRON":
                tier = "HIERRO";
              break;
              case "BRONZE":
                tier = "BRONCE";
              break;
              case "SILVER":
                tier = "PLATA";
              break;
              case "GOLD":
                tier = "ORO";
              break;
              case "PLATINUM":
                tier = "PLATINO";
              break;
              case "DIAMOND":
                tier = "DIAMANTE";
              break;
              case "MASTER":
                tier = "MAESTRO";
              break;
              case "GRANDMASTER":
                tier = "GRAN MAESTRO";
              break;
              case "CHALLENGER":
                tier = "ASPIRANTE";
              break;
            }
      
            // Si no es Highelo escribo la división
            switch(tier)
            {
              case "MAESTRO": case "GRAN MAESTRO": case "ASPIRANTE":
                rank = tier;
              break;
              default:
                rank = tier + " " + leagueData[i].rank;
              break;
            }
      
            // Escribo el resto de parámetros
            lps = leagueData[i].leaguePoints;
            puntuacion += lps;
            wins = leagueData[i].wins;
            losses = leagueData[i].losses;
            totalGames = wins + losses;
      
            // Calcular winrate
            if (totalGames > 0) {
              winrate = (wins / totalGames) * 100;
              winrate = winrate.toFixed(2) + "%";
              puntuacion += 0.99*(wins / totalGames);
            }
      
            // Calcular puntuación
            switch(rank)
            {
              // Hierro
              case "HIERRO IV":
                puntuacion += 101;
              break;
              case "HIERRO III":
                puntuacion += 202;
              break;
              case "HIERRO II":
                puntuacion += 303;
              break;
              case "HIERRO I":
                puntuacion += 404;
              break;
      
              // Bronce
              case "BRONCE IV":
                puntuacion += 505;
              break;
              case "BRONCE III":
                puntuacion += 606;
              break;
              case "BRONCE II":
                puntuacion += 707;
              break;
              case "BRONCE I":
                puntuacion += 808;
              break;
      
              // Plata
              case "PLATA IV":
                puntuacion += 909;
              break;
              case "PLATA III":
                puntuacion += 1010;
              break;
              case "PLATA II":
                puntuacion += 1111;
              break;
              case "PLATA I":
                puntuacion += 1212;
              break;
      
              // Oro
              case "ORO IV":
                puntuacion += 1313;
              break;
              case "ORO III":
                puntuacion += 1414;
              break;
              case "ORO II":
                puntuacion += 1515;
              break;
              case "ORO I":
                puntuacion += 1616;
              break;
      
              // Platino
              case "PLATINO IV":
                puntuacion += 1717;
              break;
              case "PLATINO III":
                puntuacion += 1818;
              break;
              case "PLATINO II":
                puntuacion += 1919;
              break;
              case "PLATINO I":
                puntuacion += 2020;
              break;
      
              // Diamante
              case "DIAMANTE IV":
                puntuacion += 2121;
              break;
              case "DIAMANTE III":
                puntuacion += 2222;
              break;
              case "DIAMANTE II":
                puntuacion += 2323;
              break;
              case "DIAMANTE I":
                puntuacion += 2424;
              break;
      
              // Master
              case "MAESTRO":
                puntuacion += 5050;
              break;
      
              // Grandmaster
              case "GRAN MAESTRO":
                puntuacion += 10100;
              break;
      
              // CHALLENGER
              case "ASPIRANTE":
                puntuacion += 20200;
              break;
            }
      
            // Si se ha pasado de las partidas queda descalificado
            if(totalGames > maximo + 5 || estaEliminado(summonerName, datosOcultos))
              puntuacion = -1;
          }
        }
      
        // Si está descalificado los puntos son -1 aunque no esté posicionado aún
        if(puntuacion == 0 && estaEliminado(summonerName, datosOcultos))
          puntuacion = -1;
        
        // Completar últimos apartados del array
        var opgg = '=HYPERLINK("' + "https://www.op.gg/summoners/euw/" + encodeURIComponent(summonerName) + '"; "' + summonerName + '")';
        var twitch = getTwitchChannel(summonerName);
        var status = getTwitchStatus(summonerName);
      
        // Comprobar si el límite ha sido excedido, de ser así habrá que preguntarle el porque
        if(totalGames > maximo && puntuacion != -1)
          maximo = maximo + " (Pendiente)";
        
        // Crear array de datos
        var stats = [summonerName, rank, lps, wins, losses, totalGames + " de " + maximo, winrate, opgg, twitch, status, puntuacion];
      
        // Devolver el array de datos como parámetro
        return stats;
      }
      
      
      function getTwitchChannel(summonerName) {
        // Aquí se realiza la lógica para obtener el canal de Twitch del jugador
      
        // Ejemplo de datos ficticios
        switch (summonerName) {
          case "Moco Semεnpai":
            return '<a href="https://www.twitch.tv/moco_senpai" target="_blank">moco_senpai</a>';
          case "sumiguelito19":
            return '<a href="https://www.twitch.tv/miguesu" target="_blank">miguesu</a>';
          default:
            return "";
        }
      }
      
      function getTwitchStatus(summonerName) {
        // Aquí se realiza la lógica para obtener el estado del canal de Twitch del jugador
      
        // Ejemplo de datos ficticios
        switch (summonerName) {
          case "Moco Semεnpai":
            return "LIVE";
          case "sumiguelito19":
            return "OFFLINE";
          default:
            return "";
        }
}
