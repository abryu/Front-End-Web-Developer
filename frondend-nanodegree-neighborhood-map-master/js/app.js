var markersList = [];
var initialLocations = [
    {
      name : "Toronto City Hall",
      description : "A symbol of Toronto!",
      position : {lat: 43.653483, lng: -79.384094},
      index : 0
    },
    {
      name : "University of Toronto",
      description : "My dream school!",
      position : {lat: 43.662892, lng: -79.395656},
      index : 1
    },
    {
      name : "Ryerson University",
      description : "Good school!",
      position : {lat: 43.657658, lng: -79.378802},
      index : 2
    },
    {
      name : "Toronto Symphony Orchestra",
      description : "I like Classical Music!!",
      position : {lat: 43.646287, lng: -79.386327},
      index : 3
    },
];

/*
function initMap() {
  var infowindow = new google.maps.InfoWindow();

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: {lat: 43.653226, lng: -79.3831843}
  });

  for(var i = 0; i < initialLocations.length; i++) {
    var marker = new google.maps.Marker({
      name : initialLocations[i].name,
      position: initialLocations[i].position,
      map: map,
      title: initialLocations[i].description
    }); 

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(this.name + "<br>" + this.title);
        infowindow.open(map, this);
        map.panTo(this.position);
    });
  };
};
*/

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

  function initMap() {
    var infowindow = new google.maps.InfoWindow();

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: {lat: 43.653483, lng: -79.384094}
    });

    for(var i = 0; i < initialLocations.length; i++) {
      var marker = new google.maps.Marker({
        name : initialLocations[i].name,
        position: initialLocations[i].position,
        map: map,
        title: initialLocations[i].description
      }); 

      google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(this.name + "<br>" + this.title + "<br>  <a href='https://www.google.ca/'>google</a>");
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

