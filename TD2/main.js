var w;

$(document).ready(function(){
	$("#compter").click(startWorker);

	$("#cancel").click(stopWorker);
});

function startWorker(){
	if(typeof(Worker) !== "undefined") {
		if(typeof(w) == "undefined") {
			w = new Worker("worker.js");
		}
		w.postMessage($("#comment").val());

		//alert($("#comment").val());

		w.onmessage = function(event) {
			$("#nombreJetons").html(event.data);
			console.log(event.data);
		};
	} else {
		$("#nombreJetons").html("Votre navigateur ne supporte pas les Web Workers...");
	}
}

function stopWorker(){
	$("#nombreJetons").text("Annuler");
	w.terminate();
    w = undefined;
}