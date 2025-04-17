## Prérequis

Il faut avoir nodejs installé sur sa machine.

Ouvrir le terminal et se placer dans le dossier du projet.

Installer les dépendances du projet avec la commande suivante :

```bash
npm install
```

### Lancer le projet
Pour lancer le projet, il faut exécuter la commande suivante :

```bash
npm run dev
```

Le projet sera lancé par défaut sur le port 80. Vous pouvez y accéder en ouvrant votre navigateur et en allant à l'adresse suivante :



Ouvrir le navigateur et aller à l'adresse suivante : http://localhost si le port 80 est disponible, sinon aller sur l'url http://localhost:$port,
avec $port le port sur lequel le projet est lancé.(il est logiquement affiché dans le terminal après la commande `npm run dev`).

## Problèmes qui peuvent survenir
- Si la carte bloque ou qu'il y a une erreur, rafraichir la page

## Pistes d'améliorations:
- Mieux gérer les erreurs de l'API
- Ajouter un loader pendant le chargement des données
- Ajouter des tests unitaires
- Lire la position de départ à partir de la localisation de l'utilisateur
- Ajouter des tests end-to-end
- Ajouter des tests de performance
- Utiliser une librairie css pour améliorer le design et la productivité comme tailwindcss ou bootstrap
- Ajouter un stepper
- Ajouter des instructions pour rendre l'utilisation intuitive
- Dockeriser l'environnement de dev
- Ajouter une chaine CI/CD pour déployer l'application sur un serveur
- Ajouter un input pour que l'utilisateur choisit le type de trail(voiture,vélo,footing...)
- Ajouter l'internationalisation pour que l'app s'adapte à la langue de l'utilisateur
- Ajouter ce qu'il faut pour que l'application soit une progresssive web app(utilisable dans l'état sur mobile)

