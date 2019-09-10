/*function getLocation() {
    navigator.geolocation.getCurrentPosition(onLocationSuccess, onLocationError, { enableHighAccuracy: true });
}

var onLocationSuccess = function (position) {
    Latitude = position.coords.latitude;
    Longitude = position.coords.longitude;
    updateUI(Latitude, Longitude);
}

function updateUI(Lat, Long) {
    document.getElementsByClassName("red-light").html("<h1>" + Lat + "</h1>");
    document.getElementsByClassName("green-light").html("<h1>" + Long + "</h1>");
}

function onLocationError() {
    document.getElementsByClassName("red-light").html("<h1> An Error has occured</h1>");
}
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    getLocation();
}*/
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    alert("navigator.geolocation works well");
}