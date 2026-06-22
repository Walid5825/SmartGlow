# 🔴 LEVEL 4 – Application Mobile avec React Native

Ce quatrième niveau m'a permis de développer une application mobile permettant de piloter les LEDs de la Raspberry Pi à distance depuis un smartphone. L'application communique avec l'API Flask développée lors des niveaux précédents afin de récupérer l'état des LEDs et d'envoyer les commandes d'allumage et d'extinction en temps réel.


## 🛠️ Tâches réalisées

✅ Installer et configurer React Native avec Expo

✅ Initialiser un projet Expo

✅ Créer une interface mobile avec React Native

✅ Afficher l'état en temps réel des LEDs verte et rouge

✅ Ajouter des boutons ON/OFF pour chaque LED

✅ Connecter l'application à l'API Flask via des requêtes HTTP (`fetch`)

✅ Tester l'application sur un smartphone réel avec Expo Go


## 📸 Preuves de réalisation (Screenshots)

### A. Création du projet Expo

```bash
npx create-expo-app smartglow-mobile
```

### B. Structure du projet

Dans le projet mobile, j’ai principalement utilisé le fichier `index.js` situé dans le dossier `src/app/`.

Ce fichier contient :

* l'interface utilisateur de l'application ;
* la communication avec l'API Flask ;
* l'affichage de l'état des LEDs ;
* les boutons permettant de piloter les LEDs.

L'application utilise également les composants React Native (`View`, `Text`, `Button`) ainsi que les Hooks React (`useState`, `useEffect`).


### C. Lancement de l'application Expo

Une fois le projet créé, j’ai lancé le serveur de développement avec la commande :

```bash
npx expo start
```

Cette commande génère un QR Code permettant d'ouvrir directement l'application sur un smartphone via l'application Expo Go.

*Capture d'écran du terminal affichant le QR Code Expo :*

<img width="597" height="406" alt="image" src="https://github.com/user-attachments/assets/9ac31408-0821-4e4b-94f2-2b749626e7d4" />


### D. Application mobile SmartGlow

Après avoir scanné le QR Code avec Expo Go, l'application s'affiche sur le smartphone.

L'interface contient :

* un titre SmartGlow ;
* une carte LED Verte ;
* une carte LED Rouge ;
* des boutons ON et OFF pour chaque LED ;
* des indicateurs visuels affichant l'état des LEDs.

*Capture d'écran de l'application sur smartphone :*

<img width="295" height="600" alt="IMG_1290" src="https://github.com/user-attachments/assets/fb83633a-6aa6-46ab-91a5-a89422bd9604" />



## 🧪 Tests réalisés

### Vérification de l'affichage de l'état des LEDs

L'application récupère automatiquement l'état actuel des LEDs grâce à l'endpoint :

```http
GET /status
```


### Vérification de l'allumage de la LED verte

En appuyant sur le bouton ON, la commande envoyée est :

```http
POST /led/verte/on
```

Résultat :

* La LED verte s'allume physiquement sur la Raspberry Pi

<img width="428" height="571" alt="IMG_1291" src="https://github.com/user-attachments/assets/f492e252-ce72-48a4-b02f-610382d3bd98" />


* L'indicateur de l'application devient vert

<img width="295" height="600" alt="IMG_1294" src="https://github.com/user-attachments/assets/336db5e5-a5fc-4478-96a8-82b35c5fa4dc" />




### Vérification de l'allumage de la LED rouge

En appuyant sur le bouton ON, la commande envoyée est :

```http
POST /led/rouge/on
```

Résultat :

* La LED rouge s'allume

<img width="428" height="571" alt="IMG_1292" src="https://github.com/user-attachments/assets/fddba156-7348-4020-95b3-2958797cb2d0" />


* L'indicateur de l'application devient rouge

<img width="295" height="600" alt="IMG_1295" src="https://github.com/user-attachments/assets/3bfaf1fa-b2b0-4979-a98c-262f2d830b95" />



### Allumage des deux LEDs simultanément

Résultat :

* Les deux LEDs s'allument sur la Raspberry Pi

<img width="428" height="571" alt="IMG_1293" src="https://github.com/user-attachments/assets/24b0e140-b863-47a8-b7d6-9413e55ab724" />


* Les indicateurs de l'application deviennent vert et rouge


<img width="295" height="600" alt="IMG_1296" src="https://github.com/user-attachments/assets/8a8b3f61-d399-4ec2-a44e-0f51d2bad04b" />



## 🎯 Résultat obtenu

L'application mobile SmartGlow permet désormais :

* de visualiser l'état des LEDs en temps réel ;
* d'allumer ou d'éteindre les LEDs depuis un smartphone ;
* de communiquer avec la Raspberry Pi via l'API Flask ;
* de piloter les LEDs à distance depuis le réseau local ;
* d'utiliser une interface mobile simple et intuitive.

Le système est maintenant composé de :

* une API Flask exécutée sur la Raspberry Pi ;
* un dashboard web Next.js développé au Level 3 ;
* une application mobile React Native Expo développée au Level 4.

Le Level 4 est validé avec une application mobile fonctionnelle capable de piloter physiquement les LEDs de la Raspberry Pi depuis un smartphone réel.
