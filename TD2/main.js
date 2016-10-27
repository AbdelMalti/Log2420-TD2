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

		w.onmessage = function(event) {
			$("#nombreJetons").html(event.data.words);
			$("#progression").html(event.data.percentage + "%");

			$(".progress-bar").css("width", event.data.percentage + "%")
			$("#progression").css("width", event.data.percentage + "%")
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