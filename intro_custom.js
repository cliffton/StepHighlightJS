$(document).ready(function(){
	var exe_list = [];
	var currentStep = 0;
	var step_list = [];

	init_intro = function(){
		var step_list = document.querySelectorAll('*[data-step]');
		for (var i = 0; i < step_list.length; i++) {
			if($(step_list[i]).attr('data-trigger') == 'click' ){
				var step = parseInt($(step_list[i]).attr('data-step'));
				exe_list.push({'element':step_list[i],'time':'NaN', 'step':step});
			}
			else{
				var time = parseInt($(step_list[i]).attr('data-time'));
				var step = parseInt($(step_list[i]).attr('data-step'));
				exe_list.push({'element':step_list[i],'time':time, 'step':step})
			}
		};
		console.log(exe_list);
		intro_sort();
	};

	pop_intro = function(element){
		// var element = exe_list.pop();
		try{
			// $(element.element).css({'background':'red'});
			setHighlight(element);
			if (element.time == 'NaN') {
				$(element.element).click(function(){
					
					var elem = nextStep();
					pop_intro(elem);
					removeHighlight(element);
					// $(element.element).css({'background':'white'});
				});
			}
			else{
				setTimeout(function(){
					var elem = nextStep();
					pop_intro(elem);
					removeHighlight(element);
					// $(element.element).css({'background':'white'});
				},element.time)
			}
		}
		catch(err){
			console.log(err);
		};
	};

	nextStep = function(){
		currentStep++;
		if (currentStep == exe_list.length) {
			introEnd();
		}
		else{
			return exe_list[currentStep];
		};
	};

	startIntro = function(){
		pop_intro(exe_list[0]);
	};

	goToStep = function(step){
		currentStep = step;
		pop_intro(exe_list[step]);
	};

	introEnd = function(){
		alert("The End");
	};

	setHighlight = function(element){
		$(element.element).css({'border':'1px solid blue'});
	};

	removeHighlight = function(element){
		$(element.element).css({'border':'1px solid white'});
	};

	intro_sort = function(){

		function compare(a,b) {
			if (a.step < b.step)
		    	return -1;
		  	if (a.step > b.step)
		    	return 1;
		  	return 0;
		};

		exe_list.sort(compare);
	};

	intro_refresh = function(){
		currentStep = 0;
	};

	intro_destroy = function(){
		exe_list = [];
		currentStep = 0;
		step_list = [];
	};

});