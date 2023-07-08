function obtenerDatosDeJugador(indice, datosOcultos){

    // Nombre del jugador
    var summonerName = players[indice];
  
    var url = "https://" + server + ".api.riotgames.com/lol/summoner/v4/summoners/by-name/" + encodeURIComponent(summonerName) + "?api_key=" + RiotApiKey;
    var response = UrlFetchApp.fetch(url);
    var summonerData = JSON.parse(response.getContentText());
  
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
  
  function maximoPartidas(){
    var hoy = new Date();
    hoy.setHours(0,0,0,0);
  
    var fechaInicio = new Date(2023, 5, 25);
    hoy.setHours(0,0,0,0);
  
    var tiempo_transcurrido = hoy.getTime() - fechaInicio.getTime();
    var dias_transcurridos = (tiempo_transcurrido)/(1000 * 60 * 60 * 24);
  
    return ((dias_transcurridos + 1)*5);
  }
  
  function estaEliminado(nombreInvocador, datosOcultos){
    for(var i = 0; i < datosOcultos.length; i++)
      if(datosOcultos[i][0] == nombreInvocador)
        return(datosOcultos[i][2] == "Si");
  }