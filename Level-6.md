# 🟣 LEVEL 6 – Synchronisation en temps réel avec Socket.IO

Ce sixième niveau m'a permis d'ajouter une synchronisation en temps réel entre le dashboard web et l'application mobile. Grâce à Socket.IO, toute modification de l'état des LEDs est immédiatement transmise à l'ensemble des clients connectés, sans rechargement manuel.

L'API Flask joue le rôle de serveur Socket.IO et diffuse les changements d'état des LEDs au dashboard Next.js ainsi qu'à l'application mobile React Native.

## 🛠️ Tâches réalisées

✅ Installer et configurer Flask-SocketIO sur la Raspberry Pi

✅ Configurer le serveur Socket.IO dans l'API Flask

✅ Émettre un événement `led_update` à chaque changement d'état d'une LED

✅ Connecter le dashboard Next.js et l'application React Native au serveur Socket.IO

✅ Mettre à jour automatiquement l'interface web et l'application mobile lors d'un changement d'état

## 📸 Preuves de réalisation

**Annexe :** Un enregistrement d'écran de démonstration est fournie en annexe afin d'illustrer le fonctionnement de la synchronisation en temps réel. Cet enregistrement montre le dashboard web et l'application mobile ouverts simultanément, avec une mise à jour instantanée de l'état des LEDs sur les deux interfaces lors de chaque action, sans rechargement manuel.


### A. Installation de Flask-SocketIO

Installation du package dans l'environnement virtuel :

```bash
pip install flask-socketio eventlet
```


### B. Configuration de Socket.IO

Initialisation du serveur Socket.IO dans l'API Flask :

```python
from flask_socketio import SocketIO

socketio = SocketIO(
    app,
    cors_allowed_origins="*",
    async_mode="eventlet"
)
```

### C. Émission des événements temps réel

À chaque modification d'une LED, l'API envoie un événement à tous les clients connectés.

```python
socketio.emit("led_update", {
    "color": "verte",
    "state": 1
})
```


### D. Intégration dans le Dashboard Web

Le dashboard établit une connexion Socket.IO et écoute les événements envoyés par l'API.

```javascript
socket.on("led_update", (data) => {
    if (data.color === "verte") {
        setVerte(data.state);
    }

    if (data.color === "rouge") {
        setRouge(data.state);
    }
});
```


### E. Intégration dans l'application mobile

L'application React Native écoute également les événements afin de mettre à jour automatiquement l'interface.

```javascript
socket.on("led_update", (data) => {
    if (data.color === "verte") {
        setVerte(data.state);
    }

    if (data.color === "rouge") {
        setRouge(data.state);
    }
});
```


## 🧪 Tests réalisés

### Synchronisation Web → Mobile

Action :

* Allumage de la LED verte depuis le dashboard web.

Résultat :

* La LED physique s'allume sur la Raspberry Pi.
* L'application mobile met automatiquement à jour son interface.


✅ Test validé

### Synchronisation Mobile → Web

Action :

* Allumage de la LED rouge depuis l'application mobile.

Résultat :

* La LED physique s'allume.
* Le dashboard web met automatiquement à jour son interface.


✅ Test validé

### Synchronisation simultanée

Action :

* Dashboard web et application mobile ouverts en même temps.

Résultat :

* Toute modification effectuée sur un appareil est répercutée instantanément sur l'autre, sans rechargement manuel.


✅ Test validé

## 🎯 Résultat obtenu

Le système SmartGlow fonctionne désormais en temps réel grâce à Socket.IO.

Les changements d'état des LEDs sont automatiquement synchronisés entre tous les clients connectés.

Le système comprend maintenant :

* une API Flask avec Socket.IO ;
* un dashboard Next.js synchronisé en temps réel ;
* une application React Native synchronisée en temps réel ;
* une communication bidirectionnelle sans rechargement manuel.

Le Level 6 est validé avec une synchronisation temps réel fonctionnelle entre le dashboard web, l'application mobile et la Raspberry Pi.
