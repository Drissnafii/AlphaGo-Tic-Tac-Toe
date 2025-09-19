# Jeu de Morpion Dynamique en JavaScript

Ce projet est une implémentation moderne et évolutive du jeu de Morpion (Tic Tac Toe), développée en JavaScript vanilla avec une architecture modulaire ES6. Contrairement à la version classique 3×3, cette application permet aux joueurs de configurer entièrement leur expérience de jeu :

- **Grille configurable** : Taille de grille de 3×3 jusqu'à 13×13
- **Condition de victoire adaptable** : Nombre de symboles à aligner (k) personnalisable
- **Architecture modulaire** : Code structuré avec séparation des préoccupations (gameLogic.js, ui.js, main.js)
- **Persistance des données** : Sauvegarde automatique via localStorage
- **Interface responsive** : Design adaptatif pour tous les appareils

Développé dans le cadre d'un cas pratique pour l'entreprise fictive PlayInnovate, ce projet démontre une approche professionnelle du développement web moderne.

➡️ Accéder à la démo en ligne (Pensez à héberger votre projet sur GitHub Pages ou un service similaire et à mettre le lien ici)

![Aperçu du jeu](assets/images/matrice.png)

## Table des matières

- [Contexte du Projet](#contexte-du-projet)
- [Fonctionnalités Principales](#fonctionnalités-principales)
- [Technologies et Outils](#technologies-et-outils)
- [Structure du Projet](#structure-du-projet)
- [Implémentation Technique](#implémentation-technique)
- [Installation et Lancement](#installation-et-lancement)
- [Planification et Gestion](#planification-et-gestion)
- [Critères de performance respectés](#critères-de-performance-respectés)
- [Auteur](#auteur)

## Contexte du Projet

L'entreprise fictive PlayInnovate, une start-up spécialisée dans le gaming en ligne, souhaitait enrichir son catalogue avec un jeu de Tic Tac Toe évolutif. L'objectif était de dépasser la version classique en offrant aux joueurs la possibilité de configurer leurs propres règles (taille de la grille et condition de victoire) pour une expérience plus flexible et engageante.

## Fonctionnalités Principales

### Configuration de Jeu Avancée

- **Grille de jeu 100% configurable** : Taille de grille de 3×3 jusqu'à 13×13 avec génération dynamique des cellules
- **Condition de victoire adaptable** : Nombre de symboles à aligner (k) de 3 jusqu'à la taille de la grille
- **Choix des symboles** : Les joueurs peuvent choisir entre X/O comme symbole de départ

### Expérience de Jeu

- **Logique de jeu pour deux joueurs** : Alternance automatique des tours avec Player 1 qui commence toujours
- **Détection automatique du vainqueur** : Algorithme optimisé vérifiant les alignements horizontaux, verticaux et diagonaux
- **Gestion des matchs nuls** : Détection automatique quand la grille est pleine sans vainqueur
- **Animation de victoire** : Mise en surbrillance progressive de la ligne gagnante avec effets hover

### Interface Utilisateur

- **Génération dynamique de la grille** : Adaptation automatique de la taille des cellules selon la configuration
- **Affichage en temps réel** : 
  - Joueur actuel et condition de victoire (k symboles à aligner)
  - Statut de fin de partie avec messages colorés
  - Tableau des scores persistant
- **Contrôles intuitifs** :
  - Bouton "New Game" pour recommencer avec les mêmes paramètres
  - Bouton "Reset Scores" pour remettre à zéro les compteurs
  - Inputs séparés pour grid size et k-alignment avec validation

### Persistance et Performance

- **Sauvegarde automatique** : État complet du jeu sauvegardé via localStorage (plateau, scores, préférences)
- **Chargement intelligent** : Restauration automatique de la partie en cours au rechargement de la page
- **Gestion des scores** : Comptage séparé des victoires pour chaque symbole et des matchs nuls
- **Responsive Design** : Interface adaptative pour ordinateur, tablette et mobile avec calculs dynamiques

## Technologies et Outils

### Architecture Technique

Le projet adopte une architecture modulaire basée sur le principe de **Séparation des Préoccupations** (Separation of Concerns) pour garantir la maintenabilité et la clarté du code :

- **HTML5** : Structure sémantique et accessible de l'application
- **CSS3** : Design moderne avec Flexbox/Grid, animations et responsive design
- **JavaScript ES6+ Modules** : Architecture modulaire sans dépendances externes

### Structure Modulaire

#### `gameLogic.js` (Le Modèle)
- **Responsabilité** : Gérer l'état complet du jeu et les règles métier
- **Fonctionnalités** : Gestion de l'état (`board`, `currentPlayer`, `gridSize`, `kAlignment`), algorithme de détection de victoire n×k, persistance localStorage
- **Découplage** : Entièrement indépendant du DOM

#### `ui.js` (La Vue)
- **Responsabilité** : Gérer toutes les interactions avec le DOM
- **Fonctionnalités** : Génération dynamique de la grille, mise à jour visuelle, animations de victoire, affichage des scores
- **Rendu** : Adaptation automatique de la taille des cellules selon la grille

#### `main.js` (Le Contrôleur)
- **Responsabilité** : Orchestrer la communication entre la logique et l'interface
- **Fonctionnalités** : Initialisation, gestion des événements, coordination des modules

## Installation et Lancement

Ce projet ne nécessite aucune dépendance ou étape de compilation.

1. Clonez ce dépôt sur votre machine locale :

```bash
git clone https://github.com/Drissnafii/AlphaGo-Tic-Tac-Toe.git
```

2. Naviguez jusqu'au dossier du projet :

```bash
cd AlphaGo-Tic-Tac-Toe
```

3. Ouvrez le fichier `index.html` directement dans votre navigateur web.

## Structure du Projet

L'arborescence des fichiers suit une architecture modulaire claire avec séparation des préoccupations, facilitant la maintenance et la compréhension du code.

```
AlphaGo-Tic-Tac-Toe/
├── index.html                    # Point d'entrée de l'application
├── README.md                     # Documentation du projet
├── assets/
│   ├── css/
│   │   └── style.css            # Styles de l'application (responsive design)
│   ├── images/                  # Ressources visuelles du projet
│   │   ├── cellForEach.png      # Documentation visuelle
│   │   └── matrice.png          # Aperçu du jeu
│   └── js/                      # Modules JavaScript ES6
│       ├── main.js              # Contrôleur principal (orchestrateur)
│       ├── gameLogic.js         # Logique métier (état du jeu, règles)
│       └── ui.js                # Gestion de l'interface (DOM manipulation)
└── Docs/
    └── projectDocs.md           # Documentation technique détaillée
```

### Organisation Modulaire

- **`/assets/js/`** : Modules JavaScript avec imports/exports ES6
- **`/assets/css/`** : Styles centralisés avec design responsive
- **`/assets/images/`** : Ressources visuelles et documentation
- **`/Docs/`** : Documentation technique complète

## Implémentation Technique

### Algorithme de Détection de Victoire (n,k)

Le cœur algorithmique du projet est la fonction `checkWin(symbol)` qui gère la détection de victoire pour une grille n×n avec k symboles à aligner :

1. **Vérification Horizontale** : Parcours de chaque ligne pour détecter k symboles consécutifs
2. **Vérification Verticale** : Analyse des colonnes avec la même logique
3. **Vérification Diagonale** : Diagonales principales (↘) avec incrémentation simultanée des indices
4. **Vérification Anti-Diagonale** : Diagonales secondaires (↙) avec indices opposés

L'algorithme retourne les coordonnées de la ligne gagnante pour l'animation visuelle.

### Persistance des Données

**localStorage Implementation :**
- `saveGameState()` : Sérialisation JSON de l'état complet (plateau, joueur actuel, scores, préférences)
- `loadGameState()` : Désérialisation et restauration automatique au chargement
- **Données sauvegardées** : État du plateau, joueur courant, taille de grille, k-alignment, scores

### Architecture ES6 Modules

**Import/Export Pattern :**
```javascript
// gameLogic.js - Exports des fonctions métier
export { playTurn, getGameStatus, getBoard, ... }

// main.js - Orchestration des modules  
import { playTurn, ... } from './gameLogic.js';
import { updateBoard, ... } from './ui.js';
```

**Avantages :**
- Encapsulation des données (variables privées au module)
- API publique claire via exports sélectifs
- Découplage total entre logique métier et interface

## Planification et Gestion

La planification des tâches, le suivi des fonctionnalités et la gestion du temps ont été réalisés à l'aide de JIRA.

➡️ Accéder au tableau de planification JIRA

## Critères de performance respectés

- **Architecture ES6 Modules** : Code structuré en modules avec imports/exports pour une maintenance optimale

- **Manipulation dynamique du DOM** : Génération automatique de la grille avec adaptation responsive de la taille des cellules

- **Stockage local (localStorage)** : Persistance complète de l'état du jeu, des scores et des préférences utilisateur

- **Structure HTML sémantique** : Utilisation de balises appropriées pour l'accessibilité et le référencement

- **Algorithme optimisé (n,k)** : Détection de victoire efficace pour grilles variables avec complexité contrôlée

- **Séparation des préoccupations** : Architecture MVC avec modules distincts (Modèle, Vue, Contrôleur)

- **Bonnes pratiques (Clean Code)** :
  - Conventions de nommage cohérentes (camelCase JS, kebab-case CSS)
  - Code commenté et documenté
  - Validation des entrées utilisateur
  - Gestion d'erreurs appropriée