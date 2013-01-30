function createSeedData(upperLeft, lowerRight, step) {
	// e.g. createSeedData([52.551, 13.339], [52.492, 13.494], 0.01)
	var result = [],
		absStep = Math.abs(step),
		latStart = Math.min(upperLeft[0], lowerRight[0]),
		latEnd = Math.max(upperLeft[0], lowerRight[0]),
		lngStart = Math.min(upperLeft[1], lowerRight[1]),
		lngEnd = Math.max(upperLeft[1], lowerRight[1]);

	for (var lat = latStart; lat < latEnd; lat += absStep) {
		for (var lng = lngStart; lng < lngEnd; lng += absStep) {
			var template = {
				"type": "position",
				"geojson": {
					"type": "Point",
					"coordinates": [lat, lng]
				}
			};
			result.push(template);
		}
	}
	
	return {
		"docs": result
	};
}
