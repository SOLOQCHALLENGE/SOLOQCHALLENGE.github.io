function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function esperar() {
  console.log('Antes de la pausa');
  await sleep(100);
  console.log('Después de la pausa');
}

async function getTwitchChannel(summonerName) {
  const twitchChannels = {
    "Moco Semεnpai": "moco_senpai",
    "sumiguelito19": "miguesu",
    "Manguitos1": "IamMerkus",
    "Hî Îm Xâyâh": "Sadow_S",
    "High0nABush": "DonTTVon",
    "SuckMyUmbreon": "kratos3574"
  };

  if (twitchChannels.hasOwnProperty(summonerName)) {
    const channelName = twitchChannels[summonerName];
    const isOnline = await isTwitchChannelOnline(channelName);
    return isOnline ? '<span class="twitch-icon live"></span>' : '<span class="twitch-icon offline"></span>';
  } else {
    return "";
  }
}

async function isTwitchChannelOnline(channelName) {
  const clientId = "oekg6jv9a7wy1uk4uhahbuhdripaig"; // Reemplaza con tu propio Client ID de la API de Twitch
  const apiUrl = `https://api.twitch.tv/helix/streams?user_login=${channelName}`;

  const options = {
    method: "GET",
    headers: {
      "Client-ID": clientId,
      "Authorization": `Bearer ${await getTwitchAccessToken()}` // Obtén un Access Token de Twitch
    }
  };

  const response = await fetch(apiUrl, options);
  const data = await response.json();

  return data.data.length > 0;
}

async function getTwitchAccessToken() {
  const clientId = "oekg6jv9a7wy1uk4uhahbuhdripaig"; // Reemplaza con tu propio Client ID de la API de Twitch
  const clientSecret = "rt3oepd37eaync4fzp76ibcbttsjtm"; // Reemplaza con tu propio Client Secret de la API de Twitch

  const tokenUrl = `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`;

  const response = await fetch(tokenUrl, { method: "POST" });
  const data = await response.json();

  return data.access_token;
}





//////////////////////////


var eloValues = {
  "CHALLENGER": 6,
  "GRANDMASTER": 5,
  "MASTER": 4,
  "DIAMOND": 3,
  "PLATINUM": 2,
  "GOLD": 1,
  "SILVER": 0,
  "BRONZE": -1,
  "IRON": -2
};

var server = "euw1"; // Cambia "euw1" por el servidor correcto que deseas utilizar
var RiotApiKey = "RGAPI-d2463f55-2335-49f1-ad52-12450c94df1a"; // Cambia "RGAPI-d2463f55-2335-49f1-ad52-12450c94df1a" por tu clave de API válida



async function elo() {
  const players = ["HuevitoMiDiosa", "huevovacio", "SuckMyLickilicky", "Moco Semεnpai", "SuckMyMush00m", "sumiguelito19", "Sususupport", "falo de latex", "Hî Îm Xâyâh", "High0nABush", "Vasilotind", "Tipparnayam", "HeartBreakBuffs", "ElAfiladorSeñora", "SamiCOPPERseeker", "SuckMyCiego"];

  for (let i = 0; i < players.length; i++) {
    const summonerName = players[i];
    let encodedSummonerName = encodeURI(summonerName);

    // Corrección manual para caracteres específicos
    if (summonerName.includes("Moco Semεnpai")) {
      encodedSummonerName = "Moco%20Sem%CE%B5npai";
    } else if (summonerName.includes("Hî Îm Xâyâh")) {
      encodedSummonerName = "H%C3%AE%20%C3%8Em%20X%C3%A2y%C3%A2h";
    } else if (summonerName.includes("ElAfiladorSeñora")) {
      encodedSummonerName = "ElAfiladorSe%C3%B1ora";
    }

    // Obtener información del invocador
    const summonerUrl = `https://${server}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodedSummonerName}?api_key=${RiotApiKey}`;
    const summonerResponse = await fetch(summonerUrl);
    const summonerData = await summonerResponse.json();
    console.log(summonerData);
    const summonerId = summonerData.id;

    // Obtener información de la liga
    const eloUrl = `https://${server}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${RiotApiKey}`;
    const eloResponse = await fetch(eloUrl);
    const eloData = await eloResponse.json();
    console.log(eloData);
    
    // Verificar si hay datos de liga disponibles
    if (eloData.length > 0) {
      const firstObj = eloData[0];

      // Crear una nueva fila en la tabla
      const table = document.getElementById("myTable");
      const newRow = table.insertRow();
  
      // Insertar celdas en la nueva fila
      const cell1 = newRow.insertCell();
      const cell2 = newRow.insertCell();
      const cell3 = newRow.insertCell();
      const cell4 = newRow.insertCell();
      const cell5 = newRow.insertCell();
      const cell6 = newRow.insertCell();
      const cell7 = newRow.insertCell();
      const cell8 = newRow.insertCell();
      const cell9 = newRow.insertCell();
      const cell10 = newRow.insertCell();
      const cell11 = newRow.insertCell();
      const cell12 = newRow.insertCell();
      const cell13 = newRow.insertCell();
      
          
      // Establecer el contenido de las celdas
      const wins = firstObj.wins;
      const losses = firstObj.losses;
      const total = wins + losses;
      const winrate = ((wins / total) * 100).toFixed(2) + "%";
      const summonerLink = document.createElement("a");
      summonerLink.href = "https://www.op.gg/summoners/euw/" + encodeURIComponent(summonerName);
      summonerLink.textContent = summonerName;
      

      
      
      
      
      cell2.innerHTML = i + 1;
      cell3.innerHTML = summonerName;
      cell4.innerHTML = firstObj.leaguePoints;
      cell5.innerHTML = "";
      cell6.innerHTML = firstObj.tier + ' ' + firstObj.rank;
      cell7.innerHTML = "";
      cell8.innerHTML = wins;
      cell9.innerHTML = losses;
      cell10.innerHTML = total;
      cell11.innerHTML = winrate;
      cell12.appendChild(summonerLink);
      const twitchChannel = getTwitchChannel(summonerName);
      cell13.innerHTML = await getTwitchChannel(summonerName);

      



      //poner imagenes 
      


var elo1 = firstObj.tier + ' ' + firstObj.rank;

if (elo1.includes("GOLD")) {
  insertarImagen("Gold.png");
} else if (elo1.includes("SILVER")) {
  insertarImagen("Silver.png");
} else if (elo1.includes("BRONZE")) {
  insertarImagen("Bronze.png");
} else if (elo1.includes("IRON")) {
  insertarImagen("Iron.png");
} else if (elo1.includes("PLATINUM")) {
  insertarImagen("Platinum.png");
}

function insertarImagen(rutaImagen) {
  var imageElement = document.createElement("img");
  imageElement.src = rutaImagen;
  imageElement.style.width = "160px";
imageElement.style.height = "120px";


  var textNode = document.createTextNode(cell5.innerHTML);
  var container = document.createElement("div");
  container.appendChild(imageElement);
  container.appendChild(textNode);

  cell5.innerHTML = "";
  cell5.appendChild(container);
}

//insertar imagen rol 
//HuevitoMiDiosa
if (elo1.includes("GOLD") && summonerName.includes("HuevitoMiDiosa") ) {
  insertarImagen1("Position_Gold-Mid.png");
} else if (elo1.includes("SILVER")&& summonerName.includes("HuevitoMiDiosa")) {
  insertarImagen1("Position_Silver-Mid.png");
} else if (elo1.includes("IRON")&& summonerName.includes("HuevitoMiDiosa")) {
  insertarImagen1("Position_Iron-Mid.png");
} else if (elo1.includes("PLATINUM")&& summonerName.includes("HuevitoMiDiosa")) {
  insertarImagen1("Position_Plat-Mid.png");
} else if (elo1.includes("DIAMOND")&& summonerName.includes("HuevitoMiDiosa")) {
  insertarImagen1("Position_Diamond-Mid.png");
}
//huevovacio

 if (elo1.includes("SILVER")&& summonerName.includes("huevovacio")) {
  insertarImagen1("Position_Silver-Support.png");
} else if (elo1.includes("GOLD")&& summonerName.includes("huevovacio")) {
  insertarImagen1("Position_Gold-Support.png");
} else if (elo1.includes("IRON")&& summonerName.includes("huevovacio")) {
  insertarImagen1("Position_Iron-Support.png");
} else if (elo1.includes("PLATINUM")&& summonerName.includes("huevovacio")) {
  insertarImagen1("Position_Plat-Support.png");
} else if (elo1.includes("BRONZE")&& summonerName.includes("huevovacio")) {
  insertarImagen1("Position_Bronze-Support.png");
} else if (elo1.includes("DIAMOND")&& summonerName.includes("huevovacio")) {
  insertarImagen1("Position_Diamond-Support.png");
}
  //SuckMyLickilicky
if (elo1.includes("BRONZE")&& summonerName.includes("SuckMyLickilicky")) {
  insertarImagen1("Position_Bronze-Mid.png");
} else if (elo1.includes("SILVER")&& summonerName.includes("SuckMyLickilicky")) {
  insertarImagen1("Position_Silver-Mid.png");
} else if (elo1.includes("IRON")&& summonerName.includes("SuckMyLickilicky")) {
  insertarImagen1("Position_Iron-Mid.png");
} else if (elo1.includes("PLATINUM")&& summonerName.includes("SuckMyLickilicky")) {
  insertarImagen1("Position_Plat-Mid.png");
} else if (elo1.includes("DIAMOND")&& summonerName.includes("SuckMyLickilicky")) {
  insertarImagen1("Position_Diamond-Mid.png");
}
//suck my mushoom

if (elo1.includes("BRONZE")&& summonerName.includes("SuckMyMush00m")) {
  insertarImagen1("Position_Bronze-Top.png");
} else if (elo1.includes("SILVER")&& summonerName.includes("SuckMyMush00m")) {
  insertarImagen1("Position_Silver-Top.png");
} else if (elo1.includes("IRON")&& summonerName.includes("SuckMyMush00m")) {
  insertarImagen1("Position_Iron-Top.png");
} else if (elo1.includes("PLATINUM")&& summonerName.includes("SuckMyMush00m")) {
  insertarImagen1("Position_Plat-Top.png");
} else if (elo1.includes("DIAMOND")&& summonerName.includes("SuckMyMush00m")) {
  insertarImagen1("Position_Diamond-Top.png");
}

  //sumiguelito19
if (elo1.includes("IRON")&& summonerName.includes("sumiguelito19")) {
  insertarImagen1("Position_Iron-Bot.png");
} else if (elo1.includes("BRONZE")&& summonerName.includes("sumiguelito19")) {
  insertarImagen1("Position_Bronze-Bot.png");
} else if (elo1.includes("SILVER")&& summonerName.includes("sumiguelito19")) {
  insertarImagen1("Position_Silver-Bot.png");
} else if (elo1.includes("PLATINUM")&& summonerName.includes("sumiguelito19")) {
  insertarImagen1("Position_Plat-Bot.png");
} else if (elo1.includes("DIAMOND")&& summonerName.includes("sumiguelito19")) {
  insertarImagen1("Position_Diamond-Bot.png");
} else if (elo1.includes("GOLD")&& summonerName.includes("sumiguelito19")) {
  insertarImagen1("Position_Gold-Bot.png");
}
//Sususupport
 if (elo1.includes("PLATINUM")&& summonerName.includes("Sususupport")) {
  insertarImagen1("Position_Plat-Support.png");
} else if (elo1.includes("SILVER")&& summonerName.includes("Sususupport")) {
  insertarImagen1("Position_Silver-Support.png");
} else if (elo1.includes("IRON")&& summonerName.includes("Sususupport")) {
  insertarImagen1("Position_Iron-Support.png");
} else if (elo1.includes("GOLD")&& summonerName.includes("Sususupport")) {
  insertarImagen1("Position_Gold-Support.png");
} else if (elo1.includes("BRONZE")&& summonerName.includes("Sususupport")) {
  insertarImagen1("Position_Bronze-Support.png");
} else if (elo1.includes("DIAMOND")&& summonerName.includes("Sususupport")) {
  insertarImagen1("Position_Diamond-Support.png");
}
//falo de latex	
if (elo1.includes("PLATINUM")&& summonerName.includes("falo de latex	")) {
  insertarImagen1("Position_Plat-Support.png");
} else if (elo1.includes("SILVER")&& summonerName.includes("falo de latex	")) {
  insertarImagen1("Position_Silver-Support.png");
} else if (elo1.includes("IRON")&& summonerName.includes("falo de latex	")) {
  insertarImagen1("Position_Iron-Support.png");
} else if (elo1.includes("GOLD")&& summonerName.includes("falo de latex	")) {
  insertarImagen1("Position_Gold-Support.png");
} else if (elo1.includes("BRONZE")&& summonerName.includes("falo de latex")) {
  insertarImagen1("Position_Bronze-Support.png");
} else if (elo1.includes("DIAMOND")&& summonerName.includes("falo de latex	")) {
  insertarImagen1("Position_Diamond-Support.png");
}
//High0nABush	
if (elo1.includes("BRONZE")&& summonerName.includes("High0nABush")) {
  insertarImagen1("Position_Bronze-Top.png");
} else if (elo1.includes("SILVER")&& summonerName.includes("High0nABush")) {
  insertarImagen1("Position_Silver-Top.png");
} else if (elo1.includes("IRON")&& summonerName.includes("High0nABush")) {
  insertarImagen1("Position_Iron-Top.png");
} else if (elo1.includes("PLATINUM")&& summonerName.includes("High0nABush")) {
  insertarImagen1("Position_Plat-Top.png");
} else if (elo1.includes("DIAMOND")&& summonerName.includes("High0nABush")) {
  insertarImagen1("Position_Diamond-Top.png");
}
//Vasilotind
if (elo1.includes("BRONZE")&& summonerName.includes("Vasilotind")) {
  insertarImagen1("Position_Bronze-Mid.png");
} else if (elo1.includes("SILVER")&& summonerName.includes("Vasilotind")) {
  insertarImagen1("Position_Silver-Mid.png");
} else if (elo1.includes("IRON")&& summonerName.includes("Vasilotind")) {
  insertarImagen1("Position_Iron-Mid.png");
} else if (elo1.includes("PLATINUM")&& summonerName.includes("Vasilotind")) {
  insertarImagen1("Position_Plat-Mid.png");
} else if (elo1.includes("DIAMOND")&& summonerName.includes("Vasilotind")) {
  insertarImagen1("Position_Diamond-Mid.png");
}
//Tipparnayam
if (elo1.includes("BRONZE")&& summonerName.includes("Tipparnayam")) {
  insertarImagen1("Position_Bronze-Jungle.png");
} else if (elo1.includes("SILVER")&& summonerName.includes("Tipparnayam")) {
  insertarImagen1("Position_Silver-Jungle.png");
} else if (elo1.includes("IRON")&& summonerName.includes("Tipparnayam")) {
  insertarImagen1("Position_Iron-Jungle.png");
} else if (elo1.includes("PLATINUM")&& summonerName.includes("Tipparnayam")) {
  insertarImagen1("Position_Plat-Jungle.png");
} else if (elo1.includes("DIAMOND")&& summonerName.includes("Tipparnayam")) {
  insertarImagen1("Position_Diamond-Jungle.png");
}
//HeartBreakBuffs
if (elo1.includes("PLATINUM")&& summonerName.includes("HeartBreakBuffs")) {
  insertarImagen1("Position_Plat-Support.png");
} else if (elo1.includes("SILVER")&& summonerName.includes("HeartBreakBuffs")) {
  insertarImagen1("Position_Silver-Support.png");
} else if (elo1.includes("IRON")&& summonerName.includes("HeartBreakBuffs")) {
  insertarImagen1("Position_Iron-Support.png");
} else if (elo1.includes("GOLD")&& summonerName.includes("HeartBreakBuffs")) {
  insertarImagen1("Position_Gold-Support.png");
} else if (elo1.includes("DIAMOND")&& summonerName.includes("HeartBreakBuffs")) {
  insertarImagen1("Position_Diamond-Support.png");
}
//SamiCOPPERseeker
if (elo1.includes("IRON")&& summonerName.includes("SamiCOPPERseeker")) {
  insertarImagen1("Position_Iron-Bot.png");
} else if (elo1.includes("BRONZE")&& summonerName.includes("SamiCOPPERseeker")) {
  insertarImagen1("Position_Bronze-Bot.png");
} else if (elo1.includes("SILVER")&& summonerName.includes("SamiCOPPERseeker")) {
  insertarImagen1("Position_Silver-Bot.png");
} else if (elo1.includes("PLATINUM")&& summonerName.includes("SamiCOPPERseeker")) {
  insertarImagen1("Position_Plat-Bot.png");
} else if (elo1.includes("DIAMOND")&& summonerName.includes("SamiCOPPERseeker")) {
  insertarImagen1("Position_Diamond-Bot.png");
} else if (elo1.includes("GOLD")&& summonerName.includes("SamiCOPPERseeker")) {
  insertarImagen1("Position_Gold-Bot.png");
}
//SuckMyCiego
if (elo1.includes("BRONZE")&& summonerName.includes("SuckMyCiego")) {
  insertarImagen1("Position_Bronze-Jungle.png");
} else if (elo1.includes("SILVER")&& summonerName.includes("SuckMyCiego")) {
  insertarImagen1("Position_Silver-Jungle.png");
} else if (elo1.includes("IRON")&& summonerName.includes("SuckMyCiego")) {
  insertarImagen1("Position_Iron-Jungle.png");
} else if (elo1.includes("PLATINUM")&& summonerName.includes("SuckMyCiego")) {
  insertarImagen1("Position_Plat-Jungle.png");
} else if (elo1.includes("DIAMOND")&& summonerName.includes("SuckMyCiego")) {
  insertarImagen1("Position_Diamond-Jungle.png");
}
//Moco Semεnpai	
if (elo1.includes("BRONZE")&& summonerName.includes("Moco Semεnpai")) {
  insertarImagen1("Position_Bronze-Jungle.png");
} else if (elo1.includes("SILVER")&& summonerName.includes("Moco Semεnpai")) {
  insertarImagen1("Position_Silver-Jungle.png");
} else if (elo1.includes("IRON")&& summonerName.includes("Moco Semεnpai")) {
  insertarImagen1("Position_Iron-Jungle.png");
} else if (elo1.includes("PLATINUM")&& summonerName.includes("Moco Semεnpai")) {
  insertarImagen1("Position_Plat-Jungle.png");
} else if (elo1.includes("DIAMOND")&& summonerName.includes("Moco Semεnpai")) {
  insertarImagen1("Position_Diamond-Jungle.png");
}
//Hî Îm Xâyâh	
if (elo1.includes("IRON") && summonerName.includes("Hî Îm Xâyâh")) {
  insertarImagen1("Position_Iron-Bot.png");
} else if (elo1.includes("BRONZE") && summonerName.includes("Hî Îm Xâyâh")) {
  insertarImagen1("Position_Bronze-Bot.png");
} else if (elo1.includes("SILVER") && summonerName.includes("Hî Îm Xâyâh")) {
  insertarImagen1("Position_Silver-Bot.png");
} else if (elo1.includes("PLATINUM") && summonerName.includes("Hî Îm Xâyâh")) {
  insertarImagen1("Position_Plat-Bot.png");
} else if (elo1.includes("DIAMOND") && summonerName.includes("Hî Îm Xâyâh")) {
  insertarImagen1("Position_Diamond-Bot.png");
} else if (elo1.includes("GOLD") && summonerName.includes("Hî Îm Xâyâh")) {
  insertarImagen1("Position_Gold-Bot.png");
}

//ElAfiladorSeñora
if (elo1.includes("BRONZE") && summonerName.includes("ElAfiladorSeñora")) {
  insertarImagen1("Position_Bronze-Jungle.png");
} else if (elo1.includes("SILVER") && summonerName.includes("ElAfiladorSeñora")){
  insertarImagen1("Position_Silver-Jungle.png");
} else if (elo1.includes("IRON") && summonerName.includes("ElAfiladorSeñora")) {
  insertarImagen1("Position_Iron-Jungle.png");
} else if (elo1.includes("PLATINUM") && summonerName.includes("ElAfiladorSeñora")) {
  insertarImagen1("Position_Plat-Jungle.png");
} else if (elo1.includes("DIAMOND") && summonerName.includes("ElAfiladorSeñora")) {
  insertarImagen1("Position_Diamond-Jungle.png");
} else if (elo1.includes("GOLD") && summonerName.includes("ElAfiladorSeñora")) {
  insertarImagen1("Position_Gold-Jungle.png");
}

function insertarImagen1(rutaImagen) {
  var imageElement = document.createElement("img");
  imageElement.src = rutaImagen;
  imageElement.style.width = "25%";
imageElement.style.height = "25%";


  var textNode = document.createTextNode(cell7.innerHTML);
  var container = document.createElement("div");
  container.appendChild(imageElement);
  container.appendChild(textNode);

  cell7.innerHTML = "";
  cell7.appendChild(container);
}


          
          
          
          esperar();
          
          
      
     
}

    }
  }



esperar(3000)
elo();
