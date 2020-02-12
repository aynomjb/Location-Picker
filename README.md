# Location-Picker-in-Javascript
* Place Autocomplete
* Moveable marker

### Intializer
~~~
let NewLocationPicker;
google.maps.event.addDomListener(window, 'load', () => {
  // Parameters: ID of search input field and map.
	NewLocationPicker = new LocationPicker('searchTextField','map');
});
~~~

### Run
Open the index.html in browser

## Demo open in mobile for accurate location
https://aynomjb.github.io/Location-Picker-in-Javascript/
