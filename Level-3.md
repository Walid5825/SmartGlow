# 🟢 LEVEL 3 – Dashboard Web avec Next.js

Ce troisième niveau m'a permis de développer une interface web permettant de piloter les LEDs de la Raspberry Pi à distance depuis un navigateur. Le dashboard communique avec l'API Flask développée au Level 2 afin de récupérer l'état des LEDs et d'envoyer les commandes d'allumage et d'extinction en temps réel.



## 🛠️ Tâches réalisées

✅ Installer Node.js et npm 

✅ Initialiser un projet Next.js

✅ Créer une interface web avec React / Next.js

✅ Afficher l'état en temps réel des LEDs verte et rouge

✅ Ajouter des indicateurs visuels (LED allumée / éteinte)

✅ Ajouter des boutons ON/OFF pour chaque LED

✅ Connecter le dashboard à l'API Flask via des requêtes HTTP (`fetch`)

✅ Mettre à jour automatiquement l'état des LEDs 

✅ Tester le pilotage réel des LEDs depuis le navigateur



## 📸 Preuves de réalisation (Screenshots)

### A. Création du projet Next.js

```bash
npx create-next-app@latest smartglow-web
```

### B. Structure du projet

Dans le projet web, j’ai utilisé trois fichiers principaux pour rendre le code plus clair: `page.js` qui est le fichier principal de la page web qui est créé automatiquement dans le dossier app/ lors de l’initialisation du projet Next.js, `logic.js` créé manuellement dans le projet qui gère la communication entre le dashboard et la Raspberry Pi et `page.module.css`, le fichier CSS Module créé manuellement dans le dossier app/ qui gère le design de l'interface.

### C. Dashboard Web fonctionnel

Ensuite, j’ai lancé le serveur de développement avec la commande `npm run dev`. Cette commande permet de compiler le projet et de le rendre accessible en local.
Une fois le serveur démarré, le dashboard est accessible dans le navigateur à l’adresse suivante : http://localhost:3000
Cela permet d’afficher l’interface web et de contrôler les LEDs de la Raspberry Pi en temps réel.

<img width="960" height="504" alt="image" src="https://github.com/user-attachments/assets/b8262adb-7bbb-465e-9689-1f214f6af750" />


## 🧪 Tests réalisés

### Vérification de l'affichage de l'état des LEDs

Le dashboard récupère automatiquement l'état actuel des LEDs grâce à l'endpoint :

```http
GET /status
```


### Vérification de l'allumage de la LED verte

En appuyant sur le bouton ON, la commande envoyée est :

```http
POST /led/verte/on
```

Résultat :

- La LED verte s'allume physiquement sur la Raspberry Pi

<img width="410" height="269" alt="image" src="https://github.com/user-attachments/assets/f6c362ab-525e-44f5-8b5b-e40246a98072" />



  
- Le cercle du dashboard devient vert

<img width="1917" height="869" alt="image" src="https://github.com/user-attachments/assets/c49f1edd-f20a-4ff7-adad-9399bb784e40" />



### Vérification de l'extinction de la LED verte

En appuyant sur le bouton OFF, la commande envoyée est: 

```http
POST /led/verte/off
```

Résultat :

- La LED verte s'éteint

<img width="819" height="466" alt="image" src="https://github.com/user-attachments/assets/367766aa-8b87-4c81-9152-374da7538a63" />

- Le cercle du dashboard devient gris

<img width="1919" height="870" alt="image" src="https://github.com/user-attachments/assets/b8c182e4-e273-4fdb-9d43-d229310fce48" />



### Vérification de l'allumage de la LED rouge

En appuyant sur le bouton ON, la commande envoyée est :

```http
POST /led/rouge/on
```

Résultat :

- La LED rouge s'allume

<img width="823" height="463" alt="image" src="https://github.com/user-attachments/assets/7c055ea7-b251-493a-a738-64f375c24d3d" />


- Le cercle du dashboard devient rouge

<img width="1919" height="867" alt="image" src="https://github.com/user-attachments/assets/e1b99265-f682-48d2-8064-afa210f12a02" />



### Vérification de l'extinction de la LED rouge

En appuyant sur le bouton OFF, la commande envoyée est:

```http
POST /led/rouge/off
```

Résultat :

- La LED rouge s'éteint

<img width="819" height="466" alt="image" src="https://github.com/user-attachments/assets/1e1442f2-c3d6-4fab-bd94-5d7ebce9cd43" />


- Le cercle du dashboard devient gris

<img width="1919" height="870" alt="image" src="https://github.com/user-attachments/assets/ec838b96-7d46-4d0b-88d3-1fee7b9928e2" />


### Allumage des deux LEDs simultanément

- Les LEDs s'allument

  <img width="814" height="413" alt="image" src="https://github.com/user-attachments/assets/0d65242e-4e77-410c-a51e-b15e0e781364" />

- Les cercles des dashboards deviennent vert et rouge

<img width="1919" height="870" alt="Capture d&#39;écran 2026-06-02 141907" src="https://github.com/user-attachments/assets/6436742b-6ee0-4345-b11e-21fc73c1cf3e" />
