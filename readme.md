# Facebook Feed Widget

Ce widget permet d'afficher facilement un flux Facebook sur votre site web.

## Installation

1. Ajoutez le code suivant à l'endroit où vous souhaitez afficher le flux Facebook dans votre fichier HTML :

   ```html
   <div id="facebook-feed" data-page-id="YOUR_PAGE_ID"></div>
   <script
     src="https://cdn.jsdelivr.net/gh/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME@latest/script.js"
     defer
   ></script>
   ```

   Remplacez :

   - `YOUR_PAGE_ID` par l'ID de la page Facebook dont vous souhaitez afficher le flux.
   - `YOUR_GITHUB_USERNAME` par votre nom d'utilisateur GitHub.
   - `YOUR_REPO_NAME` par le nom de votre dépôt GitHub contenant le script.

   Note : Assurez-vous que votre dépôt GitHub est public pour que jsDelivr puisse accéder au script.

## Utilisation

Le widget s'initialisera automatiquement une fois la page chargée. Il récupérera les posts de la page Facebook spécifiée et les affichera dans une grille responsive.
