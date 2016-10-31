var w;

$(document).ready(function(){
	$("#compter").click(startWorker); //la fonction startWorker est appeler au clique de ce bouton

	$("#cancel").attr("disabled", true);//on ne doit pas pouvoir cliquer sur ce bouton au debut, sinon on va detruire un worker qui a deja ete detruit.
	
	$("#cancel").click(stopWorker); //la fonction stopWorker est appeler au clique de ce bouton
	
	$("#comment").on('change keyup paste', function() {
		textChange();
	});
});

/***
@nom : startWorker

@description :  -fonction permettant d'appeler une autre fonction qui calcule le nombre de jetons dans le text-area via un worker
				-de creer un webWorker
				-d'envoyer le contenu du text-area au webWorker
				-de modifier le pourcentage afficher en fonction de la progression du compte
				-de modifier la taille de la bar de progression en fonction de la progression
				-de modifier le fait de pouvoir appuyer sur un bouton ou non
				-de prevenir si un navigateur n'est pas compatible avec les webWorker
				
***/
function startWorker(){
	if(typeof(Worker) !== "undefined") {
		if(typeof(w) == "undefined") {
			w = new Worker("worker.js"); //Creation d'un objet qui permet de faire le lien entre le fichier worker.js et le main.js
		}
		$("#nombreJetons").html("0");
		$("#etatCompter").html("Jetons");
		$("#compter").attr("disabled", true); //Rend impossible d'appuyer sur le bouton 2 fois
		$("#cancel").attr("disabled", false); //Rend possible d'annuler le compte en cours

		w.postMessage($("#comment").val()); //Envoie du text dans la text-area a worker.js

		w.onmessage = function(event) { //Fonction qui permet de recuperer touts les elements renvoyer par worker.js
			
			$("#nombreJetons").html(event.data.words); //Modifie la compte du nombre de jetons qui se presentera au front-end
			$("#progression").html(event.data.percentage + "%");//Modifie le pourcentage de la bar de progression.

			$(".progress-bar").css("width", event.data.percentage + "%"); //Modifie la taille de la bar de progression en bleu.
			$("#progression").css("width", event.data.percentage + "%"); //Modifie la position du pourcentage #progression dans la bar de progression.

			

		};
	} else {
		$("#nombreJetons").html("Votre navigateur ne supporte pas les Web Workers..."); //Si un navigateur web ne reconnait pas les web workers.
	}
}

/***
@nom : stopWorker

@description :  -fonction de detruire le webworker et de le set a undefined
				-de reset les proprietes de la barre de progression a 0%
				-d'empecher de reappuyer sur le bouton cancel
				-de permet de cliquer sur le bouton compter
***/

function stopWorker()
{
	$("#etatCompter").html("Jetons");
	$("#nombreJetons").text("-"); //Texte a afficher dans le cas ou on annule le compte
	
	if( w != undefined){
		w.terminate(); //on met fin au worker
		w = undefined; //on met le worker a undefined afin de pouvoir le recreer dans startWorker plus tard
	}

//on reinitialise les donnees de la bar de progression pour eviter un effet elastique lorsqu'on reprend le compte plustard
	$(".progress-bar").css("width", 0 + "%"); //La taille de la bar de progression est reinitialiser a zero.
	$("#progression").css("width", 0 + "%"); //La position du pourcentage #progression dans la bar de progression est remis a zero.
	
	$("#progression").html(0 + "%");//le pourcentage est mis a 0%

	//Apres avoir annuler, on ne doit pas pouvoir recliquer sur ce bouton, sinon on va detruire un worker qui a deja ete detruit.
	$("#cancel").attr("disabled", true);
	$("#compter").attr("disabled", false); //Et on doit pouvoir reappuyer sur le bouton compter.
	
}

/***
@nom : textChange

@description :  -fonction qui indique un changement au texte
* 				-permet de réappuyer sur le bouton compter
* 				-Indique que le compte de jetons n'est plus valide pour ce texte, mais l'est pour un vieux texte.
* 				-remet la barre de p-rogression à 0
***/

function textChange()
{
	$("#compter").attr("disabled", false); // on peut compter le nouveau texte
	
	if( w != undefined ){
		w.terminate(); //on met fin au worker
		w = undefined; //On le met undefined pour qu'on puisse le recreer plus tard
	}
	
	if($("#nombreJetons").text() != '-')
	{
		$("#etatCompter").html("Jetons(Vieux)"); //si on avait déjà compté un texte, on garde la donnée, mais on indique qu'elle est vieille
	}
	
	//Réinitialisation de la barre de progression à 0
	$(".progress-bar").css("width", 0 + "%"); 
	$("#progression").css("width", 0 + "%");
	$("#progression").html(0 + "%");
	
	
}
