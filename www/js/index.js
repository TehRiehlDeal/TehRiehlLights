/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
    },

    getLocation: function() {
        navigator.geolocation.getCurrentPosition(this.onLocationSuccess, this.onLocationError, { enableHighAccuracy: true });
    },

    onLocationSuccess: function(position) {
        Latitude = position.coords.latitude;
        Longitude = position.coords.longitude;
        updateUI(Latitude, Longitude);
    },

    onLocationError: function() {
        document.getElementsByClassName("red-light").innerHTML = "<h1> An Error has occured</h1>";
    },

};

function updateUI(Lat, Long) {
    
    document.getElementsByClassName("red-light").innerHTML = "<h1>" + Lat + "</h1>";
    document.getElementsByClassName("green-light").innerHTML = "<h1>" + Long + "</h1>";
}

app.initialize();

var lights = [];
var pos = null;
var uuid = null;
var watchID = null;
var gpsOn = true;

function onSuccess(position) {
    pos = position;
}

function onError(error) {
    alert(error);
}

$('.view-lights').click(function () {
    getLights();
    $('.greenTable').empty();
    $('.redTable').empty();
    $('.red-light').hide();
    $('.green-light').hide();
    $('.view').show();
    if(gpsOn == true){
        navigator.geolocation.clearWatch(watchID);
        gpsOn = false;
    }
});

$('.add-lights').click(function () {
    $('.red-light').show();
    $('.green-light').show();
    $('.view').hide();
    if(gpsOn == false){
        watchID = navigator.geolocation.watchPosition(positionSuccess, postionError, { maximumAge: 3600000, timeout: 5000, enableHighAccuracy: true });
        gpsOn = true;
    }
});

function positionSuccess(position) {
    pos = position;
    //alert(pos);
    //return pos; 
}

function postionError() {
    alert("An error has occurred");
}

function onLocationSuccessRed() {
    Latitude = pos.coords.latitude;
    Longitude = pos.coords.longitude;
    light = {
        time: Date(Date.now()),
        Lat: Latitude,
        Lon: Longitude,
        color: "red",
        uuid: uuid
    };
    const options = {
        method: 'post',
        data: light
    };
    console.log("Sending Light");
    //httpClient.post("https://theriehldeal.com/api/addLights.php", light, success);
    //$.post("https://theriehldeal.com/api/addLights.php", light, success);
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://theriehldeal.com/api/addLights.php",
        "method": "POST",
        "processData": false,
        "data": JSON.stringify(light)
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
        success();
    });

}

function onLocationSuccessGreen() {
    Latitude = pos.coords.latitude;
    Longitude = pos.coords.longitude;
    light = {
        time: Date(Date.now()),
        Lat: Latitude,
        Lon: Longitude,
        color: "green",
        uuid: uuid
    };
    const options = {
        method: 'post',
        data: light
    };
    console.log("Sending Light");
    //httpClient.post("https://theriehldeal.com/api/addLights.php", light, success);
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://theriehldeal.com/api/addLights.php",
        "method": "POST",
        "processData": false,
        "data": JSON.stringify(light)
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
        success();
    });
}

function success() {
    var height = window.innerHeight * -.25;
    window.plugins.toast.showWithOptions(
        {
            message: "Light has successfully been recorded.", 
            duration: "short",
            position: "bottom",
            addPixelsY: height
        },function (a) { console.log("toast success: " + a) }, function (b) { alert('toast error: ' + b) });
}

function onLocationError() {
    alert("an error has occured");
}

//On Ready function
document.addEventListener("deviceready", function () {
    watchID = navigator.geolocation.watchPosition(positionSuccess, postionError, { maximumAge: 3600000, timeout: 5000, enableHighAccuracy: true });
    navigator.geolocation.getCurrentPosition(onSuccess, onError, { enableHighAccuracy: true });
    uuid = device.uuid;
    document.getElementsByClassName('red-light')[0].addEventListener('click', onLocationSuccessRed);
    document.getElementsByClassName('green-light')[0].addEventListener('click', onLocationSuccessGreen);
});

//On Pause function
document.addEventListener("pause", function(){
    navigator.geolocation.clearWatch(watchID);
});

//On Resume function
document.addEventListener("resume", function(){
    watchID = navigator.geolocation.watchPosition(positionSuccess, postionError, { maximumAge: 3600000, timeout: 5000, enableHighAccuracy: true });
});

