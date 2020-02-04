class LocationPicker{

	constructor(searchFieldSelector, mapSelector)
	{
		this.searchFieldSelector = searchFieldSelector;
		this.mapSelector = mapSelector;
		this.getLocation();
	  	this.input = document.getElementById(this.searchFieldSelector);
  		this.AUTO_COMPLETE = new google.maps.places.Autocomplete(this.input);
		google.maps.event.addListener(this.AUTO_COMPLETE, 'place_changed',() => {     
		  	this.POS.lat =  this.AUTO_COMPLETE.getPlace().geometry.location.lat();
		  	this.POS.lng =  this.AUTO_COMPLETE.getPlace().geometry.location.lng();
		  	this.update_Map();
		});
	}

	initMap()
	{
		this.MAP = new google.maps.Map(document.getElementById(this.mapSelector), {zoom: 16, center: this.POS});
		this.MAP.setOptions({draggable: true});
   		this.MARKER = new google.maps.Marker({position: this.POS, map: this.MAP});
  		this.MAP.addListener( 'drag',() => { 
		    this.MARKER.setPosition(this.MAP.getCenter());
		    this.updateTextInSearchBar();
     	});
	}

	updateTextInSearchBar()
	{
	    let geocoder = new google.maps.Geocoder(); 
    	let latlng = new google.maps.LatLng(this.MAP.getCenter().lat(),this.MAP.getCenter().lng());
   		geocoder.geocode({
        	'latLng': latlng
    	},(results, status) => {
      		if(results)
      		{
		        console.log(results[0].formatted_address)
		        document.getElementById(this.searchFieldSelector).value = results[0].formatted_address;
      		}
    	})
	}

	update_Map()
	{
		this.MAP.setCenter(this.POS);
    	this.MARKER.setPosition(this.POS)
    	console.log(this.POS)
	}

	setCurrentLocation()
	{
	 	if(navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(position => {
				this.POS = { lat: position.coords.latitude, lng: position.coords.longitude }
	      		console.log(this.POS)
	 			this.update_Map()
				this.updateTextInSearchBar()
			},function error(msg) {alert('Please enable your GPS position feature.');},{maximumAge:10000, timeout:5000, enableHighAccuracy: true});
  		} else {
    		console.log("Geolocation is not supported by this browser.");
  		}
	}

	getLocation()
	{
		if(navigator.geolocation) {
    		navigator.geolocation.getCurrentPosition(position => {
				this.POS = { lat: position.coords.latitude, lng: position.coords.longitude }
    			console.log(this.POS)
    			this.initMap()
      			this.updateTextInSearchBar()
    		},function error(msg) {alert('Please enable your GPS position feature.');},{maximumAge:10000, timeout:5000, enableHighAccuracy: true});
  		} else {
    		console.log("Geolocation is not supported by this browser.");
  		}
	}
}

let NewLocationPicker;
google.maps.event.addDomListener(window, 'load', () => {
	NewLocationPicker = new LocationPicker('searchTextField','map');
});