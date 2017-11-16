function init() {
    Survey.Survey.cssType = "bootstrap";
    Survey.defaultBootstrapCss.navigationButton = "btn btn-green";
    
	var json = (function () {
	    var json2 = null;
	    $.ajax({
	        'async': false,
	        'global': false,
	        'url': "http://localhost:8080/survey/questions",
	        'dataType': "json",
	        'success': function (data) {
	            json2 = data;
	        }
	    });
	    return json2;
	})(); 
	
    window.survey = new Survey.Model(json);
    survey.onComplete.add(function(result) {
		console.log(JSON.stringify(result.data));
		$.ajax({
			'async': false,
			'global': false,
			'contentType': 'application/json',
		    'type': "POST",
		    'url': "http://localhost:8080/survey/answers",
		    'data': JSON.stringify(result.data),
		    'dataType': 'json',
			'success': function () {
			        alert("Thanks!"); 
				}
		});
		
    });
    
    survey.onUpdateQuestionCssClasses.add(function(survey, options) {
      var classes = options.cssClasses
      
      classes.root = "sq-root";
      classes.title = "sq-title";
      classes.item = "sq-item";
      classes.label = "sq-label";
      
      if (options.question.isRequired) {
        classes.title = "sq-title sq-title-required";
        classes.root = "sq-root sq-root-required";
      }
      
      if (options.question.getType() === "checkbox") {
        classes.root = "sq-root sq-root-cb";
      }
    });
    
    
    $("#surveyElement").Survey({ 
        model: survey 
    });
    
    

}

if(!window["%hammerhead%"]) {
    init();
}
