"use strict";
/*
function initialize() {
	var mapCanvas = document.getElementById('googleMapDisplyArea');
	var mapOptions = {
	  center: new google.maps.LatLng(49.130366,-98.34677099),
	  zoom: 5,
	  mapTypeId: google.maps.MapTypeId.TERRAIN
	}
	var map = new google.maps.Map(mapCanvas, mapOptions)
}
google.maps.event.addDomListener(window, 'load', initialize);
*/
var tot = {lat: 43.653226, lng: -79.3831843};
var ham = {lat: 43.243603, lng: -79.889075};
var buf = {lat: 42.8864468, lng: -78.8783689};
var lon = {lat: 42.979398, lng: -81.246138}; 
var wat = {lat: 43.4642578, lng: -80.5204096}; 
var nia = {lat: 43.0903891, lng: -79.0861076}; 
var gue = {lat: 43.5448048, lng: -80.2481666}; 

function initMap() {

	var map = new google.maps.Map(document.getElementById('googleMapDisplyArea'), {
	zoom: 9,
	center: ham
	});

	var marker = new google.maps.Marker({
	position: tot,
	map: map,
	title: 'Toronto'
	});
	var marker = new google.maps.Marker({
	position: ham,
	map: map,
	title: 'Hamilton'
	});
	var marker = new google.maps.Marker({
	position: buf,
	map: map,
	title: 'Buffalo'
	});
	var marker = new google.maps.Marker({
	position: lon,
	map: map,
	title: 'London'
	});
	var marker = new google.maps.Marker({
	position: wat,
	map: map,
	title: 'Waterloo'
	});
	var marker = new google.maps.Marker({
	position: nia,
	map: map,
	title: 'Niagara Falls'
	});
	var marker = new google.maps.Marker({
	position: gue,
	map: map,
	title: 'Guelph'
	});

}
google.maps.event.addDomListener(window, 'load', initMap);

