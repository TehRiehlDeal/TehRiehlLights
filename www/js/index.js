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


var lights = [];
var pos = null;
var uuid = null;
var watchID = null;
var gpsOn = true;
var menuOut = false;

function onSuccess(position) {
    pos = position;
}

function onError(error) {
    alert(error);
}

$('.view-lights').click(function () {
    getLights();
    animateMenu();
    $('.greenTable').empty();
    $('.redTable').empty();
    $('.red-light').hide();
    $('.green-light').hide();
    $('.chart').hide();
    $('.view').show();
    if(gpsOn == true){
        navigator.geolocation.clearWatch(watchID);
        gpsOn = false;
    }
});

$('.add-lights').click(function () {
    animateMenu();
    $('.red-light').show();
    $('.green-light').show();
    $('.chart').hide();
    $('.view').hide();
    if(gpsOn == false){
        watchID = navigator.geolocation.watchPosition(positionSuccess, postionError, { maximumAge: 3600000, timeout: 5000, enableHighAccuracy: true });
        gpsOn = true;
    }
});

$('.pie-chart').click(function(){
    animateMenu();
    $('.red-light').hide();
    $('.green-light').hide();
    $('.view').hide();
    $('.chart').show();
    viewChart();
    
});

function positionSuccess(position) {
    pos = position;
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
    $('.red-light').click(onLocationSuccessRed);
    $('.green-light').click(onLocationSuccessGreen);
});

//On Pause function
document.addEventListener("pause", function(){
    if (gpsOn == true) {
        navigator.geolocation.clearWatch(watchID);
    } else {
        gpsOn = false;
    }
});

//On Resume function
document.addEventListener("resume", function () {
    if (gpsOn == true) {
        watchID = navigator.geolocation.watchPosition(positionSuccess, postionError, { maximumAge: 3600000, timeout: 5000, enableHighAccuracy: true });
    } else {
        gpsOn = false;
    }
});

function animateMenu(){
    if (menuOut) {
        $('#myMenu').animate({
            right: '-40vw'
        }, 200);
        $('#myMenuToggle').animate({
            right: '0vw'
        }, 200);
        menuOut = false;
    } else {
        $('#myMenu').animate({
            right: '0vw'
        }, 200);
        $('#myMenuToggle').animate({
            right: '40vw'
        }, 200);
        menuOut = true;
    }
}

$('#myMenuToggle').click(function () {
    animateMenu();
});

