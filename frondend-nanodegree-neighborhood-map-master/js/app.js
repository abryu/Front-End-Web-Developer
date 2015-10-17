//A list for storing markers.
var markersList = [];
//A single element for information window.
var infoWindowElement;
//Array for storing my interesting places basic information.
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
    {
      name : "Toronto Eaton Center",
      description : "Good shopping place!",
      position : {lat: 43.6538666, lng: -79.3801688},
      index : 4
    }
];

//Initialize AJAX at the beginning, then respectively append each AJAX to a HTML List, infoWindow capture HTML List to display Wiki
function getAJAXResult() {
  for(i = 0; i < initialLocations.length; i++) {
    var count = 0;
    var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + initialLocations[i].name + '&format=json&callback=wikiCallback'; 
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
        }
        if(infoWindowElement.indexOf("Ryerson University") > -1) {
          $("#0").text(infoWindowElement);
        } else if(infoWindowElement.indexOf("Toronto City Hall") > -1) {
          $("#1").text(infoWindowElement);
        } else if(infoWindowElement.indexOf("University of Toronto") > -1) {
          $("#2").text(infoWindowElement);
        } else if(infoWindowElement.indexOf("Toronto Symphony Orchestra") > -1) {
          $("#3").text(infoWindowElement);
        } else {
          $("#4").text(infoWindowElement);    
        }        
      }
    }).error(function(e) { //Error Handling. If a error rise, it will push a pre-defined text into the array.
      infoWindowElement = '<li>' + "Sorry, we cannot get the Wiki source now." + '</li>';
      for(var t = 0; t < initialLocations.length; t++) {
        $("#" + t).text(infoWindowElement);
      }
    }); 
    
  }
}

var ViewModel = function() {
  "use strict";
  var self = this;
  //For observing user input.
  self.userSelected = ko.observable(" ");
  //Capture HTML textInput
  self.searchInput = ko.observable("");
  //Get user selected place's index.
  self.updatedUserSelectedIndex = ko.computed(function() {
    return self.userSelected().index;
  });

  function initMap() {
    var infowindow = new google.maps.InfoWindow();

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: {lat: 43.653483, lng: -79.384094}
    });

    for(var i = 0; i < initialLocations.length; i++) { 
      //setTimeout(function(){ alert("Hello"); }, 3000);
      var marker = new google.maps.Marker({
        name : initialLocations[i].name,
        position: initialLocations[i].position,
        map: map,
        title: initialLocations[i].description,
        //info: $("\'#" + i + "\'").text()
        info: $("#" + i).text()
      }); 
      //Add action to each marker, including bounce and infomation window.
      google.maps.event.addListener(marker, 'click', function() {
          //Get user selected place's information
          //getSelectedInfo(this.name);     
          //Add Bounce to each marker
          this.setAnimation(google.maps.Animation.BOUNCE);
          function stopAnimation(marker) {
            setTimeout(function() {
              marker.setAnimation(null);
            },2000);
          }
          stopAnimation(this);
          infowindow.setContent("<br>" + this.name + "<br> <br> <li>" + this.title + "</li> <br>" + this.info);
          infowindow.open(map, this);
          map.panTo(this.position);
          console.log($(".infoDisplay").text());
          $(".infoDisplay").text(" ");
      });

      //Add action to remove the marker
      google.maps.event.addListener(marker, 'invisibleAMarker', function() {
        this.setVisible(false);
      }); 
      //Open the marker
      google.maps.event.addListener(marker, 'visibleAMarker', function() {
        this.setVisible(true);
      }); 
      //Close unrealted info windows according to users search input.
      google.maps.event.addListener(marker, 'closeUnrelatedWindows', function() {
        infowindow.close();
      }); 

      markersList.push(marker);
    }
  }

  //A function filter the markers
  self.markersFilter = function() {
    var textInputLength = self.searchInput().length;
    for(var i = 0; i < initialLocations.length; i++) {
      if(textInputLength == 1){ //When user only type in one character, compare this character to pre-defined places.
        if(initialLocations[i].name.toLowerCase().charAt(textInputLength-1) != self.searchInput().toLowerCase().charAt(textInputLength-1)) {
          google.maps.event.trigger(markersList[i], 'invisibleAMarker');
          google.maps.event.trigger(markersList[i], 'closeUnrelatedWindows');
        } else {
          google.maps.event.trigger(markersList[i], 'visibleAMarker');
        }
      }
      if(textInputLength > 1){ //When user only type in more than one character, compare latest one and two character to pre-defined places.
        if(initialLocations[i].name.toLowerCase().charAt(textInputLength-2) != self.searchInput().toLowerCase().charAt(textInputLength-2) ||
          initialLocations[i].name.toLowerCase().charAt(textInputLength-1) != self.searchInput().toLowerCase().charAt(textInputLength-1)) {
          google.maps.event.trigger(markersList[i], 'invisibleAMarker');
          google.maps.event.trigger(markersList[i], 'closeUnrelatedWindows');
        } else {
          google.maps.event.trigger(markersList[i], 'visibleAMarker');
        }
      }
    }
  };

  //A function open all markers
  self.openAllMarkers = function() {
    for(var k = 0; k < markersList.length; k++) {
      google.maps.event.trigger(markersList[k], 'visibleAMarker');
    }
  };

  //Track the latest value of HTML textInput
  self.updatedSerchInput = ko.computed(function () {  
    if(self.searchInput().length > 0 ) {
      self.markersFilter();  
    } else {     //If no character in search bar, display all markers
      self.openAllMarkers();
    }
  });

  //Triggered by SUBMIT button.
  self.getPlacesInputValue = function() {
    var newText = self.searchInput();
    for(var i = 0; i < initialLocations.length; i++) {
      if(initialLocations[i].name === newText) {
        self.userSelected(initialLocations[i]);
        google.maps.event.trigger(markersList[self.updatedUserSelectedIndex()], 'click');
      }
    }
  };

  //Triggered by CLEAR button.
  self.clearPlacesInputValue = function() {
    $("#placesInput").val('');
    self.openAllMarkers();
    google.maps.event.trigger(map, function() {map.panTo({lat: 43.653483, lng: -79.384094});});
  };

  google.maps.event.addDomListener(window, "load", initMap);

};

function initialize() {
  getAJAXResult();
  ko.applyBindings(new ViewModel());  
}