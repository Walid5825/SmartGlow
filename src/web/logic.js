// Adresse de base de l'API Flask (Raspberry Pi)
const API = "http://192.168.1.33:7000";


// Fonction pour récupérer l'état des LEDs (ON/OFF)
// Elle appelle l'API Flask sur /status
export async function getStatus() {

  // Envoie une requête HTTP GET vers le serveur
  const res = await fetch(`${API}/status`);

  // Convertit la réponse en JSON
  // Exemple : { verte: 1, rouge: 0 }
  return await res.json();
}


// Fonction pour allumer une LED
// "color" peut être "verte" ou "rouge"
export async function ledOn(color) {

  // Envoie une requête HTTP POST vers l’API Flask
  // Exemple : /led/verte/on
  await fetch(`${API}/led/${color}/on`, {
    method: "POST"
  });

  // Pas de retour car on ne récupère pas de réponse ici
}


// Fonction pour éteindre une LED
// "color" peut être "verte" ou "rouge"
export async function ledOff(color) {

  // Envoie une requête HTTP POST vers l’API Flask
  // Exemple : /led/rouge/off
  await fetch(`${API}/led/${color}/off`, {
    method: "POST"
  });

  // Pas de retour non plus
}