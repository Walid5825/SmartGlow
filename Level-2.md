### 🟡 LEVEL 2 – API Flask sur Raspberry Pi

Ce deuxième niveau m’a permis de transformer la Raspberry Pi en serveur API REST capable de contrôler les LEDs à distance via des requêtes HTTP. L’objectif était de faire le lien entre le réseau (HTTP) et le matériel (LEDs via Linux).

#### 🛠️ Tâches réalisées
- [x] Installation de Python, pip et Flask sur la Raspberry Pi
- [x] Création d’une API REST avec Flask
- [x] Implémentation des routes de contrôle des LEDs (verte et rouge)
- [x] Activation de CORS pour autoriser les requêtes externes (web/mobile)
- [x] Tests des routes avec curl
- [x] Configuration du démarrage automatique avec systemd

#### 📸 Preuves de réalisation (Screenshots)

##### A. Lancement de l’API Flask sur la Raspberry Pi
*Capture d'écran du terminal montrant le démarrage du serveur Flask :*

<img width="1090" height="162" alt="Capture d&#39;écran 2026-05-20 165711" src="https://github.com/user-attachments/assets/dfdffc37-1a3f-4151-971b-14951c65402a" />


##### B. Code de l’API Flask (`app.py`)
*📦 Livrable du projet :*
``` python
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask("SmartGlow")
CORS(app)

ledVerte="/sys/class/leds/ACT/brightness"
ledRouge="/sys/class/leds/PWR/brightness"

def changer_etat_led(led,valeur):
        open(led,"w").write(str(valeur))


def etat_led(led):
    return int(open(led,"r").read().strip())

@app.route("/status", methods=["GET"])
def status():
    return jsonify({
        "verte": etat_led(ledVerte),
        "rouge": etat_led(ledRouge)
    })


@app.route("/led/verte/on", methods=["POST"])
def ledVerte_on():
        changer_etat_led(ledVerte,1)
        return {"message": "LED verte ON"}

@app.route("/led/verte/off", methods=["POST"])
def ledVerte_off():
        changer_etat_led(ledVerte,0)
        return {"message": "LED verte OFF"}


@app.route("/led/rouge/on", methods=["POST"])
def ledRouge_on():
        changer_etat_led(ledRouge,1)
        return {"message": "LED rouge ON"}
@app.route("/led/rouge/off", methods=["POST"])
def ledRouge_off():
        changer_etat_led(ledRouge,0)
        return {"message": "LED rouge OFF"}

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=7000)


```

##### C. Tests de l’API
*Preuve que la Raspberry Pi répond aux requêtes HTTP via son adresse IP :*

 Verification de l'état des LEDs
```bash
curl http://192.168.1.33:7000/status
```
 Résultat: 



Allumer la led verte:
<img width="676" height="36" alt="image" src="https://github.com/user-attachments/assets/86aad464-662d-406c-8be7-8c1d504e504b" />



Eteindre la led verte:
<img width="680" height="38" alt="image" src="https://github.com/user-attachments/assets/ad15266b-0f89-492c-8586-ec8fc89bb4a1" />



Allumer la led rouge:
<img width="667" height="32" alt="image" src="https://github.com/user-attachments/assets/ff59e700-fc42-4d05-a52a-b0f3e06bc68a" />





Eteindre la led rouge: 
<img width="689" height="37" alt="image" src="https://github.com/user-attachments/assets/e9bf28b1-6d40-467d-acc6-644106b81cb5" />





##### D. Démarrage automatique avec systemd
*Configuration permettant de lancer automatiquement l’API au démarrage de la Raspberry Pi*

Demarrage du service: 
```bash
sudo nano /etc/systemd/system/smartglow.service
```
