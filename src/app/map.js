// https://developers.google.com/maps/documentation/javascript/examples/drawing-tools
// let res = cong.filter(student => student.subject == 'math' && student.score >= 70);
var map;

function initMap() {

        map = new google.maps.Map(document.getElementById('map'), {
          center: cong.center,
          zoom: 19,
          mapTypeId: 'roadmap',
          mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
          disableDefaultUI: true
        });

        google.maps.event.addListener(map, 'click', function(event){
            // alert(event.latLng)
            ll = { lat: event.latLng.lat(), lng: event.latLng.lng() }
            markers.push(addPerson(ll, "blue", "No Name")); //placeMarker();
        });

        google.maps.event.addListener(map, 'drag', function() {
            var target = document.getElementById("target")
            target.style.left = "-32px";
            target.style.top =  "-32px";
            // console.log(event);
         } );

        // map.events.register("move", map, function() { });

       makeMarkers(cong.persons);
}
// =============================================================================
//
// =============================================================================
function addPerson(latLng, color, title){
    marker = addMarker(latLng, color, title)
    person = {
        index:markers.length,
        memberId:"",
        coords:latLng,
        progress:"RV",
        firstName:"",
        LastName:"",
        col:"",
        street:"",
        houseNum:"",
        notes:"",
        territorio:""
    }
    cong.persons.push(person)
}
// =============================================================================
//
// =============================================================================
function addMarker(latLng, color, title){
        let url = "http://maps.google.com/mapfiles/ms/icons/" + color + "-dot.png";

    let marker = new google.maps.Marker({
          map: map,
          position: latLng,
          icon:{ url: url },
          title:title,
          index:markers.length
     })
     marker.addListener('click', function(event) {SelectMarker(marker, event)});
    return marker
}
// =============================================================================
//
// =============================================================================
function SelectMarker(marker, event) {
    var w = map.getDiv().offsetWidth/2;
    var h = map.getDiv().offsetHeight/2;
    var target = document.getElementById("target")
    target.style.left = String(event.pixel.x-32 + w) + "px";
    target.style.top =  String(event.pixel.y-32 + h) + "px";
    populateForm(marker.index)
    // map.setZoom(8);
    // map.setCenter(marker.getPosition());
}
// =============================================================================
//
// =============================================================================
function populateForm(index){
    var p = cong.persons[index]
    document.getElementById("Call").setAttribute("data-index", index);
    id = p.memberId
    console.log(p.coords)
    lat = p.coords.lat  //()
    lng = p.coords.lng  //()
    document.getElementById("Call").setAttribute("data-MemberId", id);
    document.getElementById("Call").setAttribute("data-Xcoord", lat);
    document.getElementById("Call").setAttribute("data-Ycoord", lng);
    document.getElementById("Progress").className = '';
    document.getElementById("Progress").setAttribute("class", p.progress);
    document.getElementById("FirstName").value = p.firstName;
    document.getElementById("LastName").value = p.lastName;
    document.getElementById("Col").value = p.col;
    document.getElementById("Street").value = p.street;
    document.getElementById("HouseNum").value = p.houseNum;
    document.getElementById("Notes").value = p.notes;
    document.getElementById("Territorio").value = p.territorio;
}
// =============================================================================
//
// =============================================================================
function makeMarkers(persons){
    for (var i = 0; i < persons.length; i++) {
        var color = "red"
        if(persons[i].progress == "Study"){
            color = "blue"
        }else if(persons[i].progress == "Publisher"){
            color = "yellow"
        }
        console.log(persons[i].firstName)
         markers.push(addMarker(persons[i].coords, color, persons[i].firstName));
    }
}














      // function initMap() {
      //   // The location of Uluru
      //   var uluru = {lat: -25.344, lng: 131.036};
      //   // The map, centered at Uluru
      //   var map = new google.maps.Map(
      //       document.getElementById('map'), {zoom: 4, center: uluru});
      //   // The marker, positioned at Uluru
      //   var marker = new google.maps.Marker({position: uluru, map: map});
      // }























     //
     // function searchLocations() {
     //   var address = document.getElementById("addressInput").value;
     //   var geocoder = new google.maps.Geocoder();
     //   geocoder.geocode({address: address}, function(results, status) {
     //     if (status == google.maps.GeocoderStatus.OK) {
     //      searchLocationsNear(results[0].geometry.location);
     //     } else {
     //       alert(address + ' not found');
     //     }
     //   });
     // }
     //
     // function clearLocations() {
     //   infoWindow.close();
     //   for (var i = 0; i < markers.length; i++) {
     //     markers[i].setMap(null);
     //   }
     //   markers.length = 0;
     //
     //   locationSelect.innerHTML = "";
     //   var option = document.createElement("option");
     //   option.value = "none";
     //   option.innerHTML = "See all results:";
     //   locationSelect.appendChild(option);
     // }
     //
     // function searchLocationsNear(center) {
     //   clearLocations();
     //
     //   var radius = document.getElementById('radiusSelect').value;
     //   var searchUrl = 'storelocator.php?lat=' + center.lat() + '&lng=' + center.lng() + '&radius=' + radius;
     //   downloadUrl(searchUrl, function(data) {
     //     var xml = parseXml(data);
     //     var markerNodes = xml.documentElement.getElementsByTagName("marker");
     //     var bounds = new google.maps.LatLngBounds();
     //     for (var i = 0; i < markerNodes.length; i++) {
     //       var id = markerNodes[i].getAttribute("id");
     //       var name = markerNodes[i].getAttribute("name");
     //       var address = markerNodes[i].getAttribute("address");
     //       var distance = parseFloat(markerNodes[i].getAttribute("distance"));
     //       var latlng = new google.maps.LatLng(
     //            parseFloat(markerNodes[i].getAttribute("lat")),
     //            parseFloat(markerNodes[i].getAttribute("lng")));
     //
     //       createOption(name, distance, i);
     //       createMarker(latlng, name, address);
     //       bounds.extend(latlng);
     //     }
     //     map.fitBounds(bounds);
     //     locationSelect.style.visibility = "visible";
     //     locationSelect.onchange = function() {
     //       var markerNum = locationSelect.options[locationSelect.selectedIndex].value;
     //       google.maps.event.trigger(markers[markerNum], 'click');
     //     };
     //   });
     // }
     //
     // function createMarker(latlng, name, address) {
     //    var html = "<b>" + name + "</b> <br/>" + address;
     //    var marker = new google.maps.Marker({
     //      map: map,
     //      position: latlng
     //    });
     //    google.maps.event.addListener(marker, 'click', function() {
     //      infoWindow.setContent(html);
     //      infoWindow.open(map, marker);
     //    });
     //    markers.push(marker);
     //  }
     //
     // function createOption(name, distance, num) {
     //    var option = document.createElement("option");
     //    option.value = num;
     //    option.innerHTML = name;
     //    locationSelect.appendChild(option);
     // }
     //
     // function downloadUrl(url, callback) {
     //    var request = window.ActiveXObject ?
     //        new ActiveXObject('Microsoft.XMLHTTP') :
     //        new XMLHttpRequest;
     //
     //    request.onreadystatechange = function() {
     //      if (request.readyState == 4) {
     //        request.onreadystatechange = doNothing;
     //        callback(request.responseText, request.status);
     //      }
     //    };
     //
     //    request.open('GET', url, true);
     //    request.send(null);
     // }
     //
     // function parseXml(str) {
     //    if (window.ActiveXObject) {
     //      var doc = new ActiveXObject('Microsoft.XMLDOM');
     //      doc.loadXML(str);
     //      return doc;
     //    } else if (window.DOMParser) {
     //      return (new DOMParser).parseFromString(str, 'text/xml');
     //    }
     // }
     //
     // function doNothing() {}
