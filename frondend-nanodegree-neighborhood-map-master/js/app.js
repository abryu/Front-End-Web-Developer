var markersList = [];
var infoWindowList = [];
var infoWindowElement;
var orderedInfoList = [];

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

  self.userSelected = ko.observable(" ");

  self.updatedUserSelectedName = ko.computed(function() {
        return self.userSelected().name;
  });

  self.updatedUserSelectedIndex = ko.computed(function() {
        return self.userSelected().index;
  });

  self.updatedUserSelectedPosition = ko.computed(function() {
        return self.userSelected().position;
  });

  self.getPlacesInputValue = function() {
    var newText = $("#placesInput").val();
    for(var i = 0; i < initialLocations.length; i++) {
      if(initialLocations[i].name === newText) {
        self.userSelected(initialLocations[i]);
      };
    };
  };

  self.clearPlacesInputValue = function() {
    $("#placesInput").val('');
    //self.userSelected(initialLocations[0]);
    //google.maps.event.trigger(markersList[0], 'click');
    google.maps.event.trigger(map, function() {map.panTo({lat: 43.653483, lng: -79.384094});});
  };

  for(var j = 0; j < initialLocations.length; j++) {
      var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + initialLocations[j].name + '&format=json&callback=wikiCallback';
      
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
          };
          clearTimeout(wikiRequestTimeout);
          infoWindowList.push(infoWindowElement);
        }
      });    
  };
  
  function initMap() {
    var infowindow = new google.maps.InfoWindow();

    for(var k = 0; k < infoWindowList.length; k++) {
      if (infoWindowList[k].indexOf('Ryerson University') > -1) {
        orderedInfoList[0]=infoWindowList[k];
      } else if (infoWindowList[k].indexOf('Toronto City Hall') > -1) {
        orderedInfoList[1]=infoWindowList[k];
      } else if (infoWindowList[k].indexOf('University of Toronto') > -1) {
        orderedInfoList[2]=infoWindowList[k];
      } else {
        orderedInfoList[3]=infoWindowList[k];
      };
    };

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: {lat: 43.653483, lng: -79.384094}
    });

    for(var i = 0; i < initialLocations.length; i++) {
      var marker = new google.maps.Marker({
        name : initialLocations[i].name,
        position: initialLocations[i].position,
        map: map,
        title: initialLocations[i].description,
        info: orderedInfoList[i]
      }); 

      google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent("<br>" + this.name + "<br> <br> <li>" + this.title + "</li> <br>" + this.info);
          infowindow.open(map, this);
          map.panTo(this.position);
      });

      markersList.push(marker);
    };

    self.update = ko.computed(function() {
        google.maps.event.trigger(markersList[self.updatedUserSelectedIndex()], 'click');
    });
  };

  google.maps.event.addDomListener(window, "load", initMap);

};

ko.applyBindings(new ViewModel());

