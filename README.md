# 🌟 SmartGlow
## 🎯 Objectif Général
L'objectif du projet **SmartGlow** est de concevoir et developper un écosystème IoT permettant de controler à distance les leds intégrées d'une Raspberry Pi (la led verte d'activité et la led rouge d'alimentation).

## 🚀 Résumé de la progression (Les 6 Levels)

Le projet est découpé en 6 étapes progressives, allant de la maîtrise du matériel jusqu'à la mise en place d'une architecture logicielle moderne, sécurisée et temps réel :

* **🟢 LEVEL 1 – Prise en main Matériel :** Configuration de la Raspberry Pi, accès à distance via **SSH** et écriture d'un premier script **Python** pour manipuler directement les fichiers système et faire clignoter les LEDs.
* **🟡 LEVEL 2 – Création de l'API REST :** Développement d'une API **Flask (Python)** pour exposer les contrôles des LEDs sur le réseau local via des routes HTTP (`GET /status`, `POST /led/...`). Configuration de **CORS** et automatisation du lancement au démarrage de la machine avec **systemd**.
* **🟠 LEVEL 3 – Interface Web Client :** Création d'un dashboard avec **Next.js**. L'interface affiche l'état visuel des LEDs et permet de les piloter graphiquement via des requêtes `fetch` envoyées à l'API.
* **🔴 LEVEL 4 – Application Mobile :** Développement d'une application mobile cross-platform avec **React Native (Expo)** reprenant les fonctionnalités du dashboard. Intégration d'une option pour configurer dynamiquement l'adresse IP de la Raspberry Pi et tests sur smartphone réel.
* **🔵 LEVEL 5 – Sécurisation (Authentification) :** Protection de l'infrastructure IoT par l'implémentation de tokens **JWT**. Ajout d'un endpoint sur Flask, création d'écrans de connexion sur le Web et le Mobile, et stockage sécurisé du token pour bloquer les utilisateurs non authentifiés (Erreur 401).
* **🟣 LEVEL 6 – Synchronisation Temps Réel :** Intégration de **Socket.IO** pour supprimer le rafraîchissement manuel. Dès qu'un utilisateur change l'état d'une LED sur le dashboard web, l'application mobile se met à jour instantanément (et vice-versa) grâce à un système d'événements broadcastés par l'API.
