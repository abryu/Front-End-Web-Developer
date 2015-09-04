var initialLocations = [
    {
      name : "University of Toronto",
      description : "My dreame school!",
      position : {lat: 43.662892, lng: -79.395656}
    },
    {
      name : "Ryerson University",
      description : "Good school!",
      position : {lat: 43.657658, lng: -79.378802}
    },
    {
      name : "Toronto City Hall",
      description : "Have been there two times!",
      position : {lat: 43.653483, lng: -79.384094}
    },
    {
      name : "Toronto Symphony Orchestra",
      description : "I like Classical Music!!",
      position : {lat: 43.646287, lng: -79.386327}
    },
];

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

