from flask import Flask, jsonify # Import de Flask pour créer l'API
from flask_cors import CORS # Permet d'autoriser les requêtes depuis le navigateur (Next.js)

app = Flask("SmartGlow") # Création de l'application Flask

CORS(app) # Active CORS pour permettre la communication avec le frontend

# Chemin vers les fichiers système des LEDs de la Raspberry Pi
# ACT = LED verte
# PWR = LED rouge
ledVerte="/sys/class/leds/ACT/brightness"
ledRouge="/sys/class/leds/PWR/brightness"


# Fonction pour changer l'état d'une LED
# valeur = 1 (allumé) ou 0 (éteint)
def changer_etat_led(led,valeur):
        open(led,"w").write(str(valeur)) # On écrit la valeur dans le fichier système de la LED


# Fonction pour lire l'état d'une LED
def etat_led(led):
    return int(open(led,"r").read().strip()) # On lit la valeur du fichier et on enlève les espaces / retours ligne


# Endpoint GET /status
# Permet de récupérer l'état des LEDs
@app.route("/status", methods=["GET"])
def status():

    return jsonify({
        "verte": etat_led(ledVerte),
        "rouge": etat_led(ledRouge)
    })


# Endpoint POST pour ALLUMER la LED verte
@app.route("/led/verte/on", methods=["POST"])
def ledVerte_on():

        changer_etat_led(ledVerte,1)
        return {"message": "LED verte ON"}


# Endpoint POST pour ÉTEINDRE la LED verte
@app.route("/led/verte/off", methods=["POST"])
def ledVerte_off():

        changer_etat_led(ledVerte,0)
        return {"message": "LED verte OFF"}


# Endpoint POST pour ALLUMER la LED rouge
@app.route("/led/rouge/on", methods=["POST"])
def ledRouge_on():

        changer_etat_led(ledRouge,1)
        return {"message": "LED rouge ON"}


# Endpoint POST pour ÉTEINDRE la LED rouge
@app.route("/led/rouge/off", methods=["POST"])
def ledRouge_off():

        changer_etat_led(ledRouge,0)
        return {"message": "LED rouge OFF"}


# Lancement du serveur Flask
# Accessible sur le réseau local (Raspberry Pi + autres appareils)
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=7000)
