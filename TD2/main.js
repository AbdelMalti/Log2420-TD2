var w;
var isStartAlreadyClicked = false;

$(document).ready(function(){
	$("#compter").click(startWorker);

	$("#cancel").attr("disabled", true);
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

			$(".progress-bar").css("width", event.data.percentage + "%");
			$("#progression").css("width", event.data.percentage + "%");

			$("#compter").attr("disabled", true);
			$("#cancel").attr("disabled", false);
			isStartAlreadyClicked = true;
		};
	} else {
		$("#nombreJetons").html("Votre navigateur ne supporte pas les Web Workers...");
	}
}

function stopWorker(){
	if(isStartAlreadyClicked)
		{
			$("#nombreJetons").text("Annuler");
			w.terminate();
    		w = undefined;
    		isStartAlreadyClicked = false;
    		
			$(".progress-bar").css("width", 0 + "%");
			$("#progression").css("width", 0 + "%");
		}
	$("#cancel").attr("disabled", true);
	$("#compter").attr("disabled", false);
	
}