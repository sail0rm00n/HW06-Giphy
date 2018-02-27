var topics = ["Sailor Moon", "Nana", "Gokinjo Monogatari", "Ponyo", "Princess Mononoke", "One Punch Man", "Powerpuff Girls", "Steven Universe"];

var gif; 
var gifPause; 
var gifPlay; 
var gifStill;


function makeButtons(){
	$("#buttons-display").empty();
	for(var i = 0; i < topics.length; i++){
		var button = $("<button>").text(topics[i]).addClass("animeBtn btn").attr({"data-name": topics[i]});
		$("#buttons-display").append(button);
	}

	$(".animeBtn").on("click", function(){
        event.preventDefault();
		$(".gif-display").empty();

		var anime = $(this).data("name");
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + anime + "&limit=10&api_key=dc6zaTOxFJmzC";
		$.ajax({
            url: queryURL, 
            method: "GET"
        }).then(function(giphy){
            
            gif = giphy.data;
            
            $.each(gif, function(index,value){
				gifPlay= value.images.original.url;
                
                gifPause = value.images.original_still.url;
                
                var thisRating = value.rating;
                
                var rating = $("<p>").html("Rated: "+ thisRating).addClass("rating-css");
                
                gifStill= $("<img>").attr("data-animated", gifPlay).attr("data-paused", gifPause).attr("src", gifPause).addClass("playOnClick");
                
                var gifDisplay = $("<button>").append(rating, gifStill);
				$(".gif-display").append(gifDisplay);
			});
		});
	});
}

$(document).on("click",".playOnClickr", function(){
 	   	$(this).attr("src", $(this).data("animated"));
 });
$(document).on("click",".playOnClick", function(){
 	   	$(this).attr("src", $(this).data("paused"));
});

$("#add-anime").on("click", function(){
    var newShow = $("#newAnime").val().trim();
    if (newShow !== "") {
        topics.push(newShow);
        makeButtons();
        return false;
        $("#newAnime").empty();
    }
    else if (newShow === "") {
        alert("Please enter an anime to search");
    }
});

makeButtons();