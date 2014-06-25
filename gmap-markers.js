function mapWithMarkers(container_id, items, zoom_par) {
	items_lenght = items.length
	if (items_lenght == 1) {
		// create the map based with center based on specified values of first element
		var point = new google.maps.LatLng(items[0][1], items[0][2]);
		// default zoom if not indicated
		if ( zoom_par === undefined ) {
			zoom_par = 15;
		}
	} else {
		//create the map based on calculate marksers distances and viewport dimensions
		var lats = new Array();
		var lngs = new Array();
		var lats_tot = 0;
		var lngs_tot = 0;
		items.forEach(function(item) {
			lats.push(item[1]);
			lngs.push(item[2]);
			lats_tot += item[1];
			lngs_tot += item[2];
		});
		lats.sort(); lngs.sort();
		var point = new google.maps.LatLng( ( lats_tot / items_lenght), ( lngs_tot / items_lenght) );
		zoom_par = setZoom(container_id, items_lenght, lats, lngs);
	}
	
	//###### set the options
	var mapOptions = {
		zoom: zoom_par,
		center: point,
		disableDefaultUI: false,
		panControl: false,
		zoomControl: true,
		zoomControlOptions: {style: google.maps.ZoomControlStyle.SMALL},
		mapTypeControl: true,
		mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
		scaleControl: true,
		streetViewControl: true,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById(container_id),mapOptions);
	// add the marker(s)
	items.forEach(function(item) {
		addMarker(map, new google.maps.LatLng(item[1], item[2]), item[0]);
	})

	
}




function setZoom(container_id, items_lenght, lats, lngs) {
	//calculate extreme viewport coordinates
	var extremes = 0;
	var extremes_lat = (lats[items_lenght-1]) - lats[0]
	var extremes_lng = (lngs[items_lenght-1]) - lngs[0]
	if (extremes_lat > extremes_lng) {
		extremes = extremes_lat;
	} else {
		extremes = extremes_lng;
	}
	//calclating zoom based on extreme distance
	if (extremes > 50.0)        { zoom_par = 0;  }
	else if (extremes > 25.0)   { zoom_par = 1;  }
	else if (extremes > 15.0)   { zoom_par = 2;  }
	else if (extremes > 7.0)    { zoom_par = 3;  }
	else if (extremes > 3.0)    { zoom_par = 4;  }
	else if (extremes > 1.5)    { zoom_par = 5;  }
	else if (extremes > 0.7)    { zoom_par = 6;  }
	else if (extremes > 0.4)    { zoom_par = 7;  }
	else if (extremes > 0.2)    { zoom_par = 8;  }
	else if (extremes > 0.1)    { zoom_par = 9;  }
	else if (extremes > 0.05)   { zoom_par = 10; }
	else if (extremes > 0.025)  { zoom_par = 11; }
	else if (extremes > 0.0125) { zoom_par = 12; }
	else if (extremes > 0.007)  { zoom_par = 13; }
	else if (extremes > 0.003)  { zoom_par = 14; }
	else if (extremes > 0.0015) { zoom_par = 15; }
	else if (extremes > 0.0007) { zoom_par = 16; }
	else if (extremes > 0.0003) { zoom_par = 17; }
	else if (extremes > 0.0002) { zoom_par = 18; }
	else if (extremes > 0.0001) { zoom_par = 19; }
	else if (extremes > 0.0)    { zoom_par = 20; }
	}
	//  ####  WAITING CODE #########
	//  ####  setting zoom based on dimensions of map container:
	//var div_map = document.getElementById(container_id);
	//var div_map_max_dimension;
	//var div_map_width = div_map.offsetWidth;
	//var div_map_height = div_map.offsetHeight;
	//if (div_map_width > div_map_height) {
	//	div_map_max_dimension = div_map_width;
	//} else {
	//	div_map_max_dimension = div_map_height;
	//}
	//zoom_par = ..................;
	return zoom_par;
	
}


function addMarker(map_var, point_par, title_par) {
	// create a sample marker
	var marker = new google.maps.Marker({
		position: point_par,
		title: title_par
	});
	// add marker to map
	marker.setMap(map_var);
}
