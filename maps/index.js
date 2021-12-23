let map;
let center;
let marker;
let iconImage = "https://cdn.pixabay.com/photo/2020/04/29/07/54/coronavirus-5107715_1280.png"

function initMap() {

  center = new google.maps.LatLng(-6.888418503754699, -38.558301372377265);

  map = new google.maps.Map(document.getElementById("map"), {
    center: center,
    zoom: 16,
    fullscreenControl: false,
    mapTypeId: 'roadmap'
  });

  map.addListener("click", (evt) => {
    adicionarMarcador(evt)
  });

}


function adicionarMarcador(evt) {
  var latlng = evt.latLng.lat().toString() + " " + evt.latLng.lng().toString()
  let icone = {
    url: iconImage, // url
    scaledSize: new google.maps.Size(20, 20), // scaled size
    origin: new google.maps.Point(0,0), // origin
    anchor: new google.maps.Point(0, 0) // anchor
  };
  new google.maps.Marker({
    position: evt.latLng,
    map: map,
    icon: icone,
    draggable: true,
    animation: google.maps.Animation.BOUNCE
  });
  $.get(`http://localhost:3000/writePoint/${latlng}`)
}

function ViewPoints() {
  let icone = {
    url: iconImage, // url
    scaledSize: new google.maps.Size(20, 20), // scaled size
    origin: new google.maps.Point(0,0), // origin
    anchor: new google.maps.Point(0, 0) // anchor
  };
  $.getJSON('http://localhost:3000/getPoint').done(function (data) {
    for (point in data) {
      new google.maps.Marker({
        position: new google.maps.LatLng(TransformLatLng(data[point]['coordenadas'])[0], TransformLatLng(data[point]['coordenadas'])[1]),
        map: map,
        draggable: true,
        icon: icone,
        animation: google.maps.Animation.BOUNCE
      });
    }
  })
}
function TransformLatLng(point) {
  let latLng = point.replace("POINT(", "").replace(")", "").replace(" ", "/");
  var result = latLng.split("/")
  let points = [parseFloat(result[0]), parseFloat(result[1])];
  return points
}

