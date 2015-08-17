"use strict";
$(document).ready(function() {
	function ViewModel() {
		var availableCity = [
			{city:"Toronto",location:{lat: 43.653226, lng: -79.3831843}},
			{city:"Hamilton",location:{lat: 43.243603, lng: -79.889075}},
			{city:"Buffalo",location:{lat: 42.8864468, lng: -78.8783689}},
			{city:"London",location:{lat: 42.979398, lng: -81.246138}},
			{city:"Waterloo",location:{lat: 43.4642578, lng: -80.5204096}},
			{city:"Niagara Falls",location:{lat: 43.0903891, lng: -79.0861076}},
			{city:"Guelph",location:{lat: 43.5448048, lng: -80.2481666}}
		];

		this.koAvailableCities = ko.observableArray([
			{city:"Toronto",location:{lat: 43.653226, lng: -79.3831843}},
			{city:"Hamilton",location:{lat: 43.243603, lng: -79.889075}},
			{city:"Buffalo",location:{lat: 42.8864468, lng: -78.8783689}},
			{city:"London",location:{lat: 42.979398, lng: -81.246138}},
			{city:"Waterloo",location:{lat: 43.4642578, lng: -80.5204096}},
			{city:"Niagara Falls",location:{lat: 43.0903891, lng: -79.0861076}},
			{city:"Guelph",location:{lat: 43.5448048, lng: -80.2481666}}
		]);

		this.chosenCity = ko.observable(this.koAvailableCities[0]);

		this.getCityName = function(ct) {
			return ct.name;
		}

		this.test = function() {
			return "ttt"
		};

		console.log(this.test());

		function initMap() {
			var map = new google.maps.Map(document.getElementById('googleMapDisplyArea'), {
			zoom: 9,
			center: availableCity[1].location
			});

			for(var i = 0; i < availableCity.length; i++) {
				var marker = new google.maps.Marker({
					position: availableCity[i].location,
					map: map,
					title: availableCity[i].city
				});
			};
		};
		google.maps.event.addDomListener(window, 'load', initMap);

		function loadData() {
			var $wikiElem = $('#wikipedia-links'); 
			var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + "toronto" + '&format=json&callback=wikiCallback';
			var $nytElem = $('#nyt-links');
			var nytUrl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?callback=svc_search_v2_articlesearch&q=' + 'toronto' + '&begin_date=20150810&sort=newest&api-key=2c8042c65de29dbdd1c5f102f436c4c9%3A9%3A72642111';

			var $weatherElem = $('#weather-links');
			var weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + 'toronto';

			var wikiRequestTimeout = setTimeout(function() {
				$wikiElem.text("We are sorry for we cannot get wikipedia sources");
			},8000);

			$.ajax({
				url: wikiUrl,
				dataType: "jsonp",
				success: function(response) {
					var articleList = response[1];
					var articleStr = "";
					for (var i = 0; i < 8; i++) {
						articleStr = articleList[i];
						var url = 'http://en.wikipedia.org/wiki/' + articleStr;
						$wikiElem.append('<li class="list-group-item"><a href="' + url + '" target="_blank">' + articleStr + '</a></li>');
					};
					clearTimeout(wikiRequestTimeout);
				}
			});

			$.getJSON(nytUrl, function(data) {
				var articles = data.response.docs;
				for(var i = 0; i < 5; i++) {
					var article = articles[i];
					$nytElem.append('<li class="list-group-item"><a href="'+article.web_url+'"target="_blank">' + article.headline.main + '</a></li>');

				}
			}).error(function(e) {
				$nytElem.text("We are sorry for we cannot get NYT sources");
			});

			$.getJSON(weatherUrl, function(data) {
						var tempC = (data.main.temp - 273.15).toFixed(2);
						$weatherElem.append('<ul class="list-group"><li class="list-group-item">Current City : ' 
							+ data.name + '</li><li class="list-group-item">Weather : '
							+ data.weather[0].main + '</li><li class="list-group-item">Description: '
							+ data.weather[0].description + '</li><li class="list-group-item">Temperature: '
							+ tempC + '°C</li><li class="list-group-item">Humidity: '
							+ data.main.humidity + '%</li></ul>');				
			}).error(function(e) {
				$weatherElem.text("We are sorry for we cannot get current weather");
			});			

			return false;
		}
		loadData();
	};
	ko.applyBindings(new ViewModel());
});