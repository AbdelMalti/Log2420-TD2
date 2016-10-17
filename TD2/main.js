var w;

$(document).ready(function(){
	$("#compter").click(function() {
		if(typeof(Worker) !== "undefined") {
			if(typeof(w) == "undefined") {
				w = new Worker("worker.js");
			}
			w.postMessage($("#comment").html());
			w.onmessage = function(event) {
				$("#nombreJetons").html(event.data);
			};
		} else {
			$("#nombreJetons").html("Votre navigateur ne supporte pas les Web Workers...");
		}
	});
});
