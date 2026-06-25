# 🔵 LEVEL 5 – Authentification

Ce cinquième niveau m'a permis de sécuriser l'ensemble du système SmartGlow en ajoutant une authentification basée sur des tokens JWT (JSON Web Token). L'objectif était d'empêcher tout contrôle des LEDs sans connexion préalable et de protéger les différentes interfaces (API, Dashboard Web et Application Mobile).

L'authentification a été intégrée à l'API Flask ainsi qu'aux clients Next.js et React Native afin de garantir que seules les personnes authentifiées puissent piloter les LEDs de la Raspberry Pi.


## 🛠️ Tâches réalisées

✅ Installer et configurer Flask-JWT-Extended sur la Raspberry Pi  
✅ Générer des tokens JWT après authentification  
✅ Créer l'endpoint `POST /login`  
✅ Protéger les routes de l'API avec `@jwt_required()`  
✅ Retourner une erreur 401 lorsqu'aucun token valide n'est fourni  
✅ Ajouter une page de connexion sur le Dashboard Next.js et sur l'application mobile React Native 
✅ Stocker le token JWT côté client  
✅ Implémenter la déconnexion sur le Dashboard Web et sur l'application mobile   
✅ Rediriger automatiquement vers la page de connexion lorsqu'un utilisateur n'est pas authentifié  


## 📸 Preuves de réalisation

### A. Installation de Flask JWT

Afin de gérer l'authentification via JWT, la bibliothèque Flask-JWT-Extended a été installée dans l'environnement virtuel Python de la Raspberry Pi.

```bash
source venv/bin/activate
pip install flask-jwt-extended
```

### B. Configuration de JWT dans Flask

Une clé secrète a été ajoutée à l'application Flask afin de signer les tokens JWT.

```python
app.config["JWT_SECRET_KEY"] = "SECRETSMARTGLOW2026"

jwt = JWTManager(app)
```

Cette clé est utilisée pour générer et vérifier les tokens d'authentification.


### C. Création de l'endpoint Login

Un endpoint de connexion a été ajouté à l'API.

```http
POST /login
```

Corps de la requête :

```json
{
  "email": "admin@test.com",
  "password": "admin123"
}
```


Capture d'écran du test de connexion réussi :

<img width="850" height="100" alt="image" src="https://github.com/user-attachments/assets/6cd6fbea-75ed-46ac-b0e1-6c3aaa4a62c7" />


### D. Protection des routes de l'API

Toutes les routes permettant de piloter les LEDs ont été sécurisées avec le décorateur :

```python
@jwt_required()
```

Exemple :

```python
@app.route("/led/verte/on", methods=["POST"])
@jwt_required()
def ledVerte_on():
```


### E. Vérification d'un accès sans authentification

Lorsqu'un utilisateur tente d'accéder à l'API sans fournir de token JWT, l'API refuse l'accès avec une erreur 401 Unauthorized.

Capture d'écran de l'erreur 401 :

<img width="830" height="118" alt="image" src="https://github.com/user-attachments/assets/f096345f-99d6-4b6e-a1a8-c8326d10b43c" />


### F. Authentification du Dashboard Web

Une page de connexion a été ajoutée au Dashboard Next.js.

L'utilisateur doit saisir :

* son adresse email ;
* son mot de passe.

Après validation :

* le token JWT est enregistré côté client ;
* l'utilisateur est redirigé vers le dashboard.

Capture d'écran de la page Login :

<img width="915" height="417" alt="image" src="https://github.com/user-attachments/assets/143f7358-66cc-4a6c-ab47-0e0cd29a3226" />


Un bouton de déconnexion a aussi été ajouté.

Fonctionnement :

* suppression du token ;
* redirection vers la page Login.

Capture d'écran du bouton Déconnexion :

<img width="876" height="410" alt="image" src="https://github.com/user-attachments/assets/6e507b7e-6c82-4c38-ba12-3df7f73aff57" />


### G. Protection des pages du Dashboard

Lors de l'ouverture du Dashboard :

* le token est vérifié ;
* si aucun token n'est présent, l'utilisateur est automatiquement redirigé vers la page de connexion.

Exemple :

```javascript
if (!token) {
    router.push("/login");
}
```

Le Dashboard n'est donc plus accessible sans authentification.


### H. Authentification Mobile React Native

L'application mobile a également été sécurisée.

Un écran Login a été ajouté avec :

* Email ;
* Mot de passe ;
* Bouton Connexion.

Lors de la connexion :

* le token JWT est récupéré ;
* le token est stocké dans AsyncStorage.

```javascript
await AsyncStorage.setItem("token", data.token);
```

Capture d'écran du Login Mobile :

<img width="295" height="600" alt="IMG_1310" src="https://github.com/user-attachments/assets/521f4e9d-cc04-4471-95d8-1cdc6791d568" />


Un bouton Logout aussi a été ajouté.

Fonctionnement :

```javascript
await AsyncStorage.removeItem("token");
```

Résultat :

* suppression du token ;
* retour à l'écran Login.

<img width="295" height="600" alt="IMG_1311" src="https://github.com/user-attachments/assets/2cdbf5d1-1685-4667-8bae-d537c03e747a" />


### I. Protection des routes mobiles

Au lancement de l'application :

* vérification de la présence du token ;
* redirection automatique vers Login si aucun token n'est trouvé.

Exemple :

```javascript
const token = await AsyncStorage.getItem("token");

if (!token) {
    router.replace("/login");
}
```

Le Dashboard Mobile n'est donc accessible qu'après authentification.


## 🧪 Tests réalisés

### Vérification du Login API

Commande utilisée :

```powershell
Invoke-RestMethod `
-Uri "http://192.168.1.33:7000/login" `
-Method POST `
-ContentType "application/json" `
-Body '{"email":"admin@test.com","password":"admin123"}'
```

Résultat :

```json
{
  "token": "JWT..."
}
```

✅ Connexion réussie

---

### Vérification d'un accès sans token

Commande :

```http
GET /status
```

Résultat :

```json
{
  "msg": "Missing Authorization Header"
}
```

✅ Accès refusé

---

### Vérification d'un accès avec token

Commande :

```http
Authorization: Bearer JWT_TOKEN
```

Résultat :

```json
{
  "verte": 0,
  "rouge": 0
}
```

✅ Accès autorisé



## 🎯 Résultat obtenu

Le système SmartGlow est désormais entièrement sécurisé grâce à l'authentification JWT.

Les utilisateurs doivent obligatoirement s'authentifier avant de pouvoir contrôler les LEDs.

Le système est maintenant composé de :

* une API Flask sécurisée par JWT ;
* un Dashboard Web Next.js avec authentification ;
* une application mobile React Native avec authentification ;
* un mécanisme de déconnexion sur toutes les plateformes ;
* une protection des routes empêchant tout accès non autorisé.

Le Level 5 est validé avec une authentification fonctionnelle sur l'ensemble de l'écosystème SmartGlow.
