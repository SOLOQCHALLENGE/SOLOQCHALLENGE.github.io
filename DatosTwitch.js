/*
function getTwitchChannel(summonerName){
  
    // Devuelve el canal de twitch en caso de tenerlo, en su defecto devuelve texto vacío.
    switch(summonerName){
      case "Moco Semεnpai":
        return '=HYPERLINK("https://www.twitch.tv/moco_senpai"; "moco_senpai")';
        break;
      case "sumiguelito19":
        return '=HYPERLINK("https://www.twitch.tv/miguesu"; "miguesu")';
        break;
      case "Manguitos1":
        return '=HYPERLINK("https://www.twitch.tv/IamMerkus"; "IamMerkus")';
        break;
      case "Hî Îm Xâyâh":
        return '=HYPERLINK("https://www.twitch.tv/sadow_s"; "Sadow_S")';
        break;
      case "High0nABush":
        return '=HYPERLINK("https://www.twitch.tv/DonTTVon"; "DonTTVon")';
        break;
      case "Tipparnayam":
        return '=HYPERLINK("https://kick.com/klausstreamss"; "klausstreamss")';
        break;
      case "SuckMyUmbreon":
        return '=HYPERLINK("https://www.twitch.tv/kratos3574"; "kratos3574")';
        break;
      default:
        return "";
        break;  
    }
  }
  
  function getTwitchStatus(summonerName){
    
    // Devuelve si el canal de twitch está en directo o no en caso de tenerlo, en su defecto devuelve texto vacío.
    switch(summonerName){
      case "Moco Semεnpai":
        var isOnline = isTwitchChannelOnline("moco_senpai");
        var status = isOnline ? "LIVE" : "OFFLINE";
        return status;
        break;
      case "sumiguelito19":
        var isOnline = isTwitchChannelOnline("miguesu");
        var status = isOnline ? "LIVE" : "OFFLINE";
        return status;
        break;
      case "Manguitos1":
        var isOnline = isTwitchChannelOnline("IamMerkus");
        var status = isOnline ? "LIVE" : "OFFLINE";
        return status;
        break;
      case "Hî Îm Xâyâh":
        var isOnline = isTwitchChannelOnline("Sadow_S");
        var status = isOnline ? "LIVE" : "OFFLINE";
        return status;
        break;
      case "High0nABush":
        var isOnline = isTwitchChannelOnline("DonTTVon");
        var status = isOnline ? "LIVE" : "OFFLINE";
        return status;
        break;
      case "SuckMyUmbreon":
        var isOnline = isTwitchChannelOnline("kratos3574");
        var status = isOnline ? "LIVE" : "OFFLINE";
        return status;
        break;
      default:
        return "";
        break;  
    } 
  }
  
  function isTwitchChannelOnline(channelName){
    
    var clientId = "oekg6jv9a7wy1uk4uhahbuhdripaig"; // Reemplaza con tu propio Client ID de la API de Twitch
    var apiUrl = "https://api.twitch.tv/helix/streams?user_login=" + channelName;
    
    var options = {
      method: "GET",
      headers: {
        "Client-ID": clientId,
        "Authorization": "Bearer " + getTwitchAccessToken() // Obtén un Access Token de Twitch
      }
    };
    
    var response = UrlFetchApp.fetch(apiUrl, options);
    var data = JSON.parse(response.getContentText());
    
    return data.data.length > 0;
  }
  
  function getTwitchAccessToken(){
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
*/