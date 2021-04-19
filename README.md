Bonjour Vanessa,

Pour lancer le site en local tu auras besoin de Git, nodeJS et npm.

GIT:

Pour windows: installation de git avec un terminal:
https://www.youtube.com/watch?v=nbFwejIsHlY&ab_channel=TheGrokShop

Pour windows et mac, il faut installer git-it :
https://github.com/jlord/git-it-electron#git-it

Pour linux, aller dans le terminal et mettre la commande:
sudo apt install git

NODEJS:

windows:
https://nodejs.org/fr/download/

Linux, dans le terminal:
wget -qO- https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt install -y nodejs

mac:

installation brew:
https://brew.sh/index_fr

brew update
brew install node

NPM:

Normalement installé avec node. Pour vérifier dans un terminal:
npm --version

MYSQL:

Ton back est presque prêt il ne te manque plus que la base de donnée!

windows:
Télécharge Mysql, cette petite vidéo est très facile à suivre:
https://www.youtube.com/watch?v=K1SOagDC3Xg

mac:
https://formulae.brew.sh/formula/mysql

linux:
https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-20-04-fr

Tu as maintenant accès au terminal Mysql! (c'est la petite fenêtre toute noire sur la vidéo)

Une fois que tu as  saisie le mot de passe tu peux écrire "source" dans ce terminal et faire glisser le fichier  elandata.sql depuis le dossier que tu viens de cloner.


Pour Utiliser ton site tu auras besoin de  Visual studio code que tu peux télécharger sur : https://code.visualstudio.com/download.


Choisi la version qui correspond à ta machine et lance le téléchargement.
Une fois le téléchargement  terminé ouvre le VS code  grâce à l'icône que tu auras créée sur le bureau.
Dans ton explorateur de fichier crée le dossier dans lequel tu veux stocker le code.
A partir du Menu "File" clique sur "Open folder" et va séléctionner le fichier que tu viens de créer.
En haut à gauche  tu as une liste d' éléments  choisi "Terminal" et clique sur "New Terminal"
Tu verras une fenêtre apparaitre en bas.
dans cette fenêtre tu devras écrire: git clone https://github.com/WildCodeSchool/remoteFR-R2dwild-P3-secuel-back

Bravo, tu viens de clôner le répertoire!

Maintenant, toujours dans le terminal tu vas écrire:
npm install 

Tu y es presque!


Maintenant tu peux voir  dans la liste des fichiers à gauche  un fichier qui s'appelle .envSample. Double clique dessus

tu vas voir ceci s'afficher:
"DB_PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=Elan"

Après le DB_Password= tu dois saisir ton mot de passe que tu as utilisé pour paramêtrer ton compte Mysql (celui que tu as utilisé pour accéder à ton terminal Mysql)

Une fois que cela est fait tu peux renommer le fichier en .env (sans le Sample à la fin).

Dans le terminal du VS code saisi npm start

Voilà!! ton back est fonctionnel et tourne

si tu veux "l'éteindre" et le redémarrer tu peux faire un 'Ctrl+c' cela arrêtera le processus et refaire npm start pour le relancer.

Amuse toi bien^^