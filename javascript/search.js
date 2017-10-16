$(document).ready(function() {

	$("#select-article").on("click", function(event) {
		// prevent form from submitting
		event.preventDefault();

		var search = $("#data-search").val().trim();
		var number = $("#data-number").val().trim();
		var startyear = $("#data-startyear").val().trim();
		var endyear = $("#data-endyear").val().trim();

 		var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
    	queryURL += ("q=" + search + "&sort=newest&page=" + number);

    	if(startyear !== "") {
			queryURL += ("&begin_date=" + startyear + "0101");    		
    	}
    	if(endyear !== "") {
    		queryURL += ("&end_date=" + endyear + "1231");
    	}

    	queryURL += "&api-key=4607e93b9f2d447484ff031b194b1b4d";

		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response) {
			var recvdata = response.response.docs;

			for(var i=0; i<recvdata.length; i++) {
				var div = $("<div class='well'>");

				div.append("<h4>" + (i+1) + ". " + recvdata[i].headline.main + "</h4>");
				div.append("<p>BY " + recvdata[i].source + "</p>");
				div.append("<p>Section: " + recvdata[i].section_name + "</p>");
				div.append("<p>" + recvdata[i].pub_date + "</p>");
				div.append("<a href='"+ recvdata[i].web_url +"'>" + recvdata[i].web_url + "</a>");

				$("#display-article").append(div);
			}
		});
	});
	

	$("#clear-article").on("click", function() {
		// prevent form from submitting
		event.preventDefault();

		$("#display-article").empty();
	});
});