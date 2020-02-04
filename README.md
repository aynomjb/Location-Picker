# Location-Picker-in-Javascript
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
