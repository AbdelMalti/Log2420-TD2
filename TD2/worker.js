self.importScripts("CompteurJetons.js"); //On importe le script fournit
var compteur = new CompteurJetons(); //Creation d'un objet du script fournit

self.addEventListener('message', function(e) //Creation d'un methode qui fait la communication entre le fichier main.js et compteurJetons.js
{
	
	var gen = compteur.compterJetons(e.data); //Creation d'un objet compteurJetons qui contient les methodes qui permettent de faire le compte que l'on a besoin.
	var totalWords = 0;
	var pourcent = 0;

	while(gen.next().value != undefined)
	{
		totalWords = compteur.getJetons(); //on recupere la contiter de jetons
		pourcent = compteur.getProgress(); //on recupere le pourcentage de compte effectuer
		postMessage({ //on envoie ces 2 donnees dans le main.js
			"words" : totalWords,
			"percentage" : pourcent
		});
	}
}, false);
