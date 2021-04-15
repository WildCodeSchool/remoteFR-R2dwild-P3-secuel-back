Bonjour Vanessa,

Pour Utiliser ton site tu auras besoin de  Visual studio code que tu peux télécharger sur : https://code.visualstudio.com/download.

Choisi la version qui correspond à ta machine et lance le téléchargement.

Une fois le téléchargement  terminé ouvre le VS code  grâce à l'icone que tu auras crée sur le bureau.

Dans ton explorateur de fichier crée le dossier dans lequel tu veux stocker le code.

A partir du Menu "File" clique sur "Open folder" et va séléctionner le fichier que tu viens de créer.

En haut à gauche  tu as une liste d' éléments  choisi "Terminal" et clique sur "New Terminal"

Tu verras une fenêtre apparaitre en bas.

dans cette fenêtre tu devras écrire: git clone https://github.com/WildCodeSchool/remoteFR-R2dwild-P3-secuel-back

Bravo, tu viens de cloner le répertoire!

Maintenant, toujours dans le terminal tu vas écrire:

npm init
npm install express msql2 cors morgan dotenv 

Ton back est presque prêt il ne te manque plus que la base de donnée!

Télécharge Mysql, cette petite vidéo est très facile à suivre:
https://www.youtube.com/watch?v=K1SOagDC3Xg

Tu as maintenant accès au terminal Mysql! (c'est la petite fenêtre toute noire sur la vidéo)

Une fois que tu as  saisie le mot de passe tu peux écrire "source" dans ce terminal et faire glisser le fichier  Elan.sql depuis le dossier que tu viens de cloner.

Recommence avec le fichier elandata.sql.

Tu y es presque!


Maintenant tu peux voir  dans la liste des fichiers à gauche  un fichier qui s'appelle .envSample. Double clique dessus

tu vas voir ceci s'afficher:
"DB_PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=Elan"

Après le DB_Password= tu dois saisir ton mot de passe que tu as utilisé pour paramêtrer ton compte Mysql (celui que tu as utilisé pour accéder à ton terminal Mysql)

Une fois que cela est fait tu peux renomer le fichier en .env (sans le Sample à la fin).

Dans le terminal du VS code saisi npm start

Voilà!! ton back est fonctionnel et tourne

si tu veux "l'éteindre" et le redémarrer tu peux faire un 'Ctrl+c' cela arrêtera le processus et refaire npm start pour le relancer.

Amuse toi bien^^