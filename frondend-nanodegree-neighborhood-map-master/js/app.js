var markersList = [];
var infoWindowList = [];
var infoWindowElement;

var initialLocations = [
    {
      name : "Ryerson University",
      description : "Good school!",
      position : {lat: 43.657658, lng: -79.378802},
      index : 0
    },
    {
      name : "Toronto City Hall",
      description : "A symbol of Toronto!",
      position : {lat: 43.653483, lng: -79.384094},
      index : 1
    },
    {
      name : "University of Toronto",
      description : "My dream school!",
      position : {lat: 43.662892, lng: -79.395656},
      index : 2
    },

    {
      name : "Toronto Symphony Orchestra",
      description : "I like Classical Music!!",
      position : {lat: 43.646287, lng: -79.386327},
      index : 3
    },
];

var ViewModel = function() {
  var self = this;

  self.userSelected = ko.observable("");

  self.updatedUserSelectedName = ko.computed(function() {
        return self.userSelected().name;
  });

  self.updatedUserSelectedIndex = ko.computed(function() {
        return self.userSelected().index;
  });

  self.updatedUserSelectedPosition = ko.computed(function() {
        return self.userSelected().position;
  });

  for(var j = 0; j < initialLocations.length; j++) {

      var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + initialLocations[j].name + '&format=json&callback=wikiCallback';

      console.log(wikiUrl);

      var wikiRequestTimeout = setTimeout(function() {
        infoWindowElement = "We are sorry for we cannot get wikipedia sources";
      },8000);

      $.ajax({
        url: wikiUrl,
        dataType: "jsonp",
        success: function(response) {
          var articleList = response[1];
          var articleStr = "";
          for(var i = 0; i < 1; i++) {
            articleStr = articleList[i];
            var url = 'http://en.wikipedia.org/wiki/' + articleStr;
            infoWindowElement = '<li><a href="' + url + '" target="_blank">' + articleStr + '</a></li>';
            console.log(articleStr + ' for ajax');
          };
          clearTimeout(wikiRequestTimeout);
          console.log(infoWindowElement);
          infoWindowList.push(infoWindowElement);
        }
      });    
      infoWindowList.sort();
  };
  
  function initMap() {
    var infowindow = new google.maps.InfoWindow();

    console.log(infoWindowList.length);

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: {lat: 43.653483, lng: -79.384094}
    });

    for(var i = 0; i < initialLocations.length; i++) {

      console.log(infoWindowList[i]);

      var marker = new google.maps.Marker({
        name : initialLocations[i].name,
        position: initialLocations[i].position,
        map: map,
        title: initialLocations[i].description,
        info: infoWindowList[i]
      }); 

      google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(this.name + "<br>" + this.title + "<br>" + this.info);
          infowindow.open(map, this);
          map.panTo(this.position);
      });

      markersList.push(marker);
    };

    self.testUpdate = ko.computed(function() {
        google.maps.event.trigger(markersList[self.updatedUserSelectedIndex()], 'click');
    });
  };

  google.maps.event.addDomListener(window, "load", initMap);

};

ko.applyBindings(new ViewModel());

