from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    jwt_required
)
from flask_socketio import SocketIO
from datetime import timedelta
import subprocess

# ================= APP =================
app = Flask("SmartGlow")
CORS(app)

# ================= SOCKET.IO =================
socketio = SocketIO(
    app,
    cors_allowed_origins="*",
    async_mode="eventlet"
)

# ================= JWT =================
app.config["JWT_SECRET_KEY"] = "SECRETSMARTGLOW2026"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=2)

jwt = JWTManager(app)

# ================= LED PATH =================
ledVerte = "/sys/class/leds/ACT/brightness"
ledRouge = "/sys/class/leds/PWR/brightness"

# ================= LED FUNCTIONS =================
def changer_etat_led(led, valeur):
    try:
        subprocess.run(f"echo {valeur} | sudo tee {led}", shell=True)
        return True
    except Exception as e:
        print(e)
        return False


def etat_led(led):
    try:
        with open(led, "r") as f:
            return int(f.read().strip())
    except:
        return 0

# ================= SOCKET EMIT =================
def emit_led(color, state):
    socketio.emit("led_update", {
        "color": color,
        "state": state
    })


# ================= LOGIN =================
@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    if data["email"] == "admin@test.com" and data["password"] == "admin123":
        token = create_access_token(identity=data["email"])
        return jsonify({"token": token})

    return jsonify({"message": "Invalid credentials"}), 401

# ================= STATUS =================
@app.route("/status", methods=["GET"])
@jwt_required()
def status():
    return jsonify({
        "verte": etat_led(ledVerte),
        "rouge": etat_led(ledRouge)
    })

# ================= LED VERTE =================
@app.route("/led/verte/on", methods=["POST"])
@jwt_required()
def led_verte_on():
    ok = changer_etat_led(ledVerte, 1)
    emit_led("verte", 1)
    return jsonify({"ok": ok, "verte": 1})


@app.route("/led/verte/off", methods=["POST"])
@jwt_required()
def led_verte_off():
    ok = changer_etat_led(ledVerte, 0)
    emit_led("verte", 0)
    return jsonify({"ok": ok, "verte": 0})

# ================= LED ROUGE =================
@app.route("/led/rouge/on", methods=["POST"])
@jwt_required()
def led_rouge_on():
    ok = changer_etat_led(ledRouge, 1)
    emit_led("rouge", 1)
    return jsonify({"ok": ok, "rouge": 1})


@app.route("/led/rouge/off", methods=["POST"])
@jwt_required()
def led_rouge_off():
    ok = changer_etat_led(ledRouge, 0)
    emit_led("rouge", 0)
    return jsonify({"ok": ok, "rouge": 0})

# ================= SOCKET CONNECT =================
@socketio.on("connect")
def handle_connect():
    print("Client Socket.IO connecté")

    # sync initial état (IMPORTANT LEVEL 6)
    socketio.emit("led_update", {
        "color": "verte",
        "state": etat_led(ledVerte)
    })

    socketio.emit("led_update", {
        "color": "rouge",
        "state": etat_led(ledRouge)
    })

# ================= RUN =================
if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=7000)
