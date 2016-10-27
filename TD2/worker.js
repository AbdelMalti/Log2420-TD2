self.importScripts("CompteurJetons.js");
var compteur = new CompteurJetons();

self.addEventListener('message', function(e) {
	
	var gen = compteur.compterJetons(e.data);
	var totalWords = 0;
	var pourcent = 0;

	while(gen.next().value != undefined){
		totalWords = compteur.getJetons();
		pourcent = compteur.getProgress();
		postMessage({
			"words" : totalWords,
			"percentage" : pourcent
		});
			

		
		//console.log(pourcent);
	}
	
   
}, false);
