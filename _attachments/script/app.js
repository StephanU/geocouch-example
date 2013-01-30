$(function() {
	var position = [52.520, 13.412],
		zoom = 12;

	function latLngsToWkt(latLngs) {
		var wktString = "POLYGON((";

		for (var i = 0; i < latLngs.length; ++i) {
			wktString += latLngs[i].lat + " " + latLngs[i].lng + ", ";
		}
		// last point of polygon needs to equals its first point
		wktString += latLngs[0].lat + " " + latLngs[0].lng;
		wktString += "))";

		return wktString;
	}

	function geocouchSearch(wktString, success, error) {
		var url = "http://localhost:5984/geocouch-example/_design/geocouch-example/_spatial/points";

		url += "?start_range=[]&end_range=[]"
		url += "&geometry=" + wktString;

		$.getJSON(url,function(data, textStatus, jqXHR) {
			if (data && data.rows) {
				success(data.rows);
			}
		}).error(error);
	}

	// initialize leaflet map
	var map = L.map("map").setView(position, zoom);

	// you need a cloudmade apikey for adding the openstreetmap layer, get one at http://cloudmade.com/register
	var leafletApiKey = "a31fc30597ec4aabbb753446a8cbf0d6"
	L.tileLayer('http://{s}.tile.cloudmade.com/' + leafletApiKey + '/997/256/{z}/{x}/{y}.png', {
    	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
    	maxZoom: 18
	}).addTo(map);

	// initialize leaflet.draw control
	var drawControl = new L.Control.Draw({
			position: 'topleft',
			polygon: true,
			circle: false,
			marker: false,
			rectangle: false,
			polyline: false
		}).addTo(map);

	map.on("draw:poly-created", function (event) {
		var polygon = event.poly,
			wkt = latLngsToWkt(polygon.getLatLngs());

		// draw polygon
		polygon.addTo(map);

		// make geometry search and draw marker at the resulting points
		geocouchSearch(wkt, function(result) {
			if (result) {
				for (var i = 0; i < result.length; ++i) {
					L.marker(result[i].geometry.coordinates).addTo(map);
				}
			}
		}, function(error) {
			console.log("D'oh...", error);
		});
	});

});