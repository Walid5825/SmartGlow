from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    jwt_required
)
from datetime import timedelta

app = Flask("SmartGlow")
CORS(app)


app.config["JWT_SECRET_KEY"] = "SECRETSMARTGLOW2026"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=2)

jwt = JWTManager(app)

ledVerte = "/sys/class/leds/ACT/brightness"
ledRouge = "/sys/class/leds/PWR/brightness"


def changer_etat_led(led, valeur):
    try:
        import subprocess
        subprocess.run(f"echo {valeur} | sudo tee {led}", shell=True)
        return True
    except Exception as e:
        print(e)
        return False

def etat_led(led):
    try:
        with open(led, "r") as f:
            return int(f.read().strip())

    except Exception as e:
        print(f"[LED READ ERROR] {led} -> {e}")
        return 0


@app.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    if email == "admin@test.com" and password == "admin123":

        token = create_access_token(identity=email)

        return jsonify({
            "token": token,
            "email": email
        })

    return jsonify({
        "message": "Email ou mot de passe incorrect"
    }), 401



@app.route("/status", methods=["GET"])
@jwt_required()
def status():

    return jsonify({
        "verte": etat_led(ledVerte),
        "rouge": etat_led(ledRouge)
    })



@app.route("/led/verte/on", methods=["POST"])
@jwt_required()
def ledVerte_on():

    ok = changer_etat_led(ledVerte, 1)

    return jsonify({
        "ok": ok,
        "verte": 1
    })

@jwt_required()
def ledVerte_off():

    ok = changer_etat_led(ledVerte, 0)

    return jsonify({
        "ok": ok,
        "verte": 0
    })



@app.route("/led/rouge/on", methods=["POST"])
@jwt_required()
def ledRouge_on():

    ok = changer_etat_led(ledRouge, 1)

    return jsonify({
        "ok": ok,
        "rouge": 1
    })
@jwt_required()
def ledVerte_off():

    ok = changer_etat_led(ledVerte, 0)

    return jsonify({
        "ok": ok,
        "verte": 0
    })


@app.route("/led/rouge/on", methods=["POST"])
@jwt_required()
def ledRouge_on():

    ok = changer_etat_led(ledRouge, 1)

    return jsonify({
        "ok": ok,
        "rouge": 1
    })

@app.route("/led/rouge/off", methods=["POST"])
@jwt_required()
def ledRouge_off():

    ok = changer_etat_led(ledRouge, 0)

    return jsonify({
        "ok": ok,
        "rouge": 0
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=7000)
