# Command: /commit

Analyse les changements Git et crée un commit avec un message approprié en français.

## Instructions

1. **Analyse des changements**
   - Exécute `git status` pour voir les fichiers modifiés
   - Exécute `git diff` pour comprendre la nature des changements
   - Exécute `git log --oneline -5` pour voir le style des commits récents

2. **Génération du message de commit**
   - Détermine le type de changement : feat, fix, refactor, style, docs, chore
   - Rédige un message court et descriptif en français
   - Format : `<type>: <description courte>`
   - Exemples :
     - `feat: Ajout du système de filtrage des projets`
     - `fix: Correction de l'animation du menu Articles`
     - `refactor: Amélioration de la structure du RefsContext`
     - `style: Mise à jour des styles du sidebar`

3. **Création du commit**
   - Ajoute tous les fichiers modifiés avec `git add .`
   - Crée le commit avec le message généré
   - Exécute `git status` pour confirmer

4. **Règles importantes**
   - NE PAS commit les fichiers sensibles (.env, credentials, etc.)
   - Messages TOUJOURS en français
   - Descriptions courtes mais précises
   - Si aucun changement, informe l'utilisateur

## Notes

- Cette command ne fait PAS de push automatique
- Elle commit tous les changements en staging
- Si tu veux un message personnalisé, spécifie-le dans ta demande
