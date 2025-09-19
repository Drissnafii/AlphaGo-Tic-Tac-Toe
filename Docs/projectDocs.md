# **Documentation Technique : Jeu Morpion Dynamique**

| **Version** | 1.0.0 |
| :--- | :--- |
| **Auteur** | Ayoub Mashate |
| **Date** | 19 Septembre 2025 |

---

## **1. Introduction**

### **1.1. Objectif du document**

Ce document fournit une description technique détaillée de l'application "Jeu Morpion Dynamique". Il a pour but d'expliquer l'architecture logicielle, la structure du code, les algorithmes clés et les décisions de conception prises au cours du développement. Il est destiné aux développeurs qui souhaitent comprendre, maintenir ou faire évoluer le projet.

### **1.2. Description du projet**

L'application est une implémentation moderne et évolutive du jeu de Morpion (Tic Tac Toe), développée en JavaScript vanilla, HTML5 et CSS3. Contrairement à la version classique, elle permet aux joueurs de configurer la taille de la grille (**n x n**) et le nombre de symboles à aligner pour gagner (**k**), offrant ainsi une expérience de jeu flexible et rejouable.

---

## **2. Architecture Logicielle**

### **2.1. Technologies utilisées**

*   **Langages :** HTML5, CSS3, JavaScript (ES6+ Modules)
*   **Dépendances :** Aucune. Le projet est développé en "vanilla JS" pour maximiser la performance et minimiser la complexité.
*   **Outils de gestion de projet :** JIRA (planification), Git/GitHub (contrôle de version).

### **2.2. Structure des fichiers**

Le projet adopte une architecture modulaire basée sur le principe de **Séparation des Préoccupations** (Separation of Concerns) pour garantir la maintenabilité et la clarté du code.

```
.
├── index.html                # Point d'entrée, structure sémantique de l'application.
├── assets/
│   ├── css/
│   │   └── style.css         # Styles de l'application (apparence, responsive design).
│   └── js/
│       ├── main.js           # Contrôleur principal (orchestrateur).
│       ├── gameLogic.js      # Module de logique métier (le "cerveau").
│       └── ui.js             # Module de gestion de l'interface (manipulation du DOM).
└── README.md                 # Documentation générale du projet.
```

### **2.3. Description des modules JavaScript**

#### **`gameLogic.js` (Le Modèle)**

*   **Responsabilité :** Gérer l'état complet du jeu et les règles métier. Ce module est entièrement découplé du DOM.
*   **Fonctionnalités clés :**
    *   Gestion de l'état : `board`, `currentPlayer`, `gridSize`, `kAlignment`, `scores`.
    *   Création et redimensionnement dynamique du plateau de jeu.
    *   Logique de jeu : `playTurn()`.
    *   Algorithme de détection de victoire (`checkWinner()`).
    *   Gestion de la persistance des données via `saveGameState()` et `loadGameState()` avec le `localStorage`.

#### **`ui.js` (La Vue)**

*   **Responsabilité :** Gérer toutes les interactions avec le DOM et traduire l'état du jeu en une représentation visuelle.
*   **Fonctionnalités clés :**
    *   `renderBoard()` : Génération dynamique de la grille HTML.
    *   `updateStatus()` : Mise à jour des messages textuels (tour du joueur, message de victoire).
    *   `updateScores()` : Affichage des scores.
    *   Gestion des styles dynamiques (ex: mise en surbrillance de la ligne gagnante).

#### **`main.js` (Le Contrôleur)**

*   **Responsabilité :** Initialiser l'application et orchestrer la communication entre la logique (`gameLogic.js`) et l'interface (`ui.js`).
*   **Fonctionnalités clés :**
    *   `initializeGame()` : Point d'entrée principal.
    *   Gestion des écouteurs d'événements (`addEventListener`).
    *   `handleCellClick()` : Traduit l'événement du DOM en action de jeu.

---

## **3. Algorithmes et Logiques Clés**

### **3.1. Algorithme de détection de victoire (n, k)**

La fonction `checkWinner(board, k)` est le cœur algorithmique du projet. Elle est conçue pour fonctionner sur une grille de taille `n` pour un alignement de `k` symboles. L'algorithme procède en quatre étapes séquentielles :

1.  **Vérification Horizontale :** Parcourt chaque ligne pour des séquences de `k` symboles identiques.
2.  **Vérification Verticale :** Applique la même logique, mais en parcourant les colonnes.
3.  **Vérification Diagonale (Haut-Gauche → Bas-Droit) :** Vérifie les séquences où l'index de ligne et de colonne s'incrémentent simultanément.
4.  **Vérification Anti-Diagonale (Haut-Droit → Bas-Gauche) :** Vérifie les séquences où l'index de ligne s'incrémente et celui de colonne se décrémente.

La fonction retourne le symbole du gagnant (`'X'` ou `'O'`) dès qu'un alignement est trouvé, ou `null` sinon.

### **3.2. Persistance des données avec `localStorage`**

*   **`saveGameState()` :** Collecte l'état du jeu (`board`, `currentPlayer`, `scores`, etc.) dans un objet, le sérialise en JSON avec `JSON.stringify()`, et le stocke dans une clé unique du `localStorage`. Cette fonction est déclenchée après chaque coup valide.
*   **`loadGameState()` :** Au chargement, tente de récupérer la chaîne JSON depuis le `localStorage`. Si elle existe, `JSON.parse()` la reconvertit en objet pour restaurer l'état de l'application.

---

## **4. Améliorations futures possibles**

*   **IA / Joueur Ordinateur :** Implémenter un mode de jeu contre un ordinateur (par exemple, avec un algorithme Minimax).
*   **Jeu en ligne :** Adapter l'architecture pour un mode multijoueur en utilisant WebSocket.
*   **Animations et effets sonores :** Améliorer l'expérience utilisateur.
*   **Thèmes personnalisables :** Permettre aux utilisateurs de choisir des thèmes visuels.

---

## **5. Installation et Déploiement**

### **5.1. Installation locale**

Le projet ne nécessite aucune dépendance externe.

1.  **Clonez le dépôt :**
    ```bash
    git clone https://github.com/votre-nom-utilisateur/nom-du-projet.git
    ```
2.  **Naviguez vers le dossier :**
    ```bash
    cd nom-du-projet
    ```
3.  **Lancez un serveur web local** à la racine du projet (ex: avec l'extension "Live Server" de VS Code).
4.  **Ouvrez votre navigateur** à l'adresse fournie (ex: `http://127.0.0.1:5500`).

### **5.2. Déploiement**

L'application est statique et peut être déployée sur n'importe quel service d'hébergement statique.

**Avec GitHub Pages (Recommandé) :**
1.  Poussez votre code sur la branche `main` de votre dépôt GitHub.
2.  Dans `Settings` > `Pages`, sous "Build and deployment", sélectionnez `Deploy from a branch`.
3.  Choisissez la branche `main` et le dossier `/ (root)`.
4.  Sauvegardez. Le site sera accessible à `https://votre-nom-utilisateur.github.io/nom-du-projet/`.

---

## **6. Tests**

### **6.1. Stratégie de test**

Les tests ont été menés manuellement, en se concentrant sur les cas d'utilisation et les cas limites.

### **6.2. Scénarios de test manuels**

*   **Logique de jeu (`gameLogic.js`) :**
    *   Détection de victoire pour toutes les combinaisons (horizontale, verticale, diagonales).
    *   Détection correcte d'un match nul.
    *   Impossibilité de jouer sur une case prise ou après la fin de partie.
    *   Réinitialisation correcte de l'état du jeu.

*   **Interface utilisateur (`ui.js` & `main.js`) :**
    *   Affichage correct du symbole après un clic.
    *   Mise à jour du statut du joueur et des messages de fin de partie.
    *   Fonctionnement des boutons "Recommencer" et "Réinitialiser les scores".
    *   Fonctionnement du menu des paramètres pour changer `n` et `k`.

*   **Persistance des données (`localStorage`) :**
    *   Mise à jour des scores dans le `localStorage` après une victoire.
    *   Rechargement correct de l'état du jeu (scores, préférences, partie en cours) après rafraîchissement de la page.

---

## **7. Guide pour les Futurs Développeurs**

### **7.1. Conventions de codage**

*   **JavaScript :** Nommage `camelCase`. Utilisation de `const` par défaut, `let` si réassignation nécessaire.
*   **HTML :** Structure sémantique.
*   **CSS :** Convention de nommage BEM simplifiée (ex: `game-container`, `cell`, `cell--winner`).

### **7.2. Comment ajouter une nouvelle fonctionnalité**

**Exemple : Ajouter un son lors d'un coup.**

1.  **Logique (`gameLogic.js`) :** Aucune modification nécessaire.
2.  **Interface (`ui.js`) :** Créer une nouvelle fonction `playSound(soundName)` qui sélectionne un élément `<audio>` et appelle sa méthode `.play()`.
3.  **Contrôleur (`main.js`) :** Dans `handleCellClick`, après la validation du coup, appeler `ui.playSound('move')`.