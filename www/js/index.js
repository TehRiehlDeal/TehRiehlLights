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
document.addEventListener("DOMContentLoaded", function () {
    var watchID = navigator.geolocation.watchPosition(positionSuccess, postionError, { maximumAge: 3600000, enableHighAccuracy: true });
    navigator.geolocation.getCurrentPosition(onSuccess, onError, { enableHighAccuracy: true});
    //document.getElementsByClassName('view-lights')[0].addEventListener('click', viewLights);


    function onSuccess(position){
        pos = position;
        uuid = device.uuid;
        document.getElementsByClassName('red-light')[0].addEventListener('click', onLocationSuccessRed);
        document.getElementsByClassName('green-light')[0].addEventListener('click', onLocationSuccessGreen);
    }

    function onError(error){
        alert(error);
    }



    $('.view-lights').click(function(){
        getLights();
        $('.greenTable').empty();
        $('.redTable').empty();
        $('.red-light').hide();
        $('.green-light').hide();
        $('.view').show();
    });

    $('.add-lights').click(function () {
        $('.red-light').show();
        $('.green-light').show();
        $('.view').hide();
    });



    function positionSuccess(position) {
        pos = position;
        //return pos; 
    }

    function postionError(){
        alert("An error has occurred");
    }
    
    function getLocationRed() {
        //navigator.geolocation.getCurrentPosition(onLocationSuccessRed, onLocationError, { enableHighAccuracy: true });

    }

    function getLocationGreen() {
        //navigator.geolocation.getCurrentPosition(onLocationSuccessGreen, onLocationError, { enableHighAccuracy: true });
    }

    function onLocationSuccessRed() {
        Latitude = pos.coords.latitude;
        Longitude = pos.coords.longitude;
        light = {
            Lat: Latitude,
            Long: Longitude,
            color: "red",
            uuid: uuid
        };
        const options = {
            method: 'post',
            data: light
        };
        console.log("Sending Light");
        //cordova.plugin.http.setDataSerializer('json');
        httpClient.post("https://6571c241.ngrok.io/api/v1/stopLights", light, success);
        
    }

    function onLocationSuccessGreen() {
        Latitude = pos.coords.latitude;
        Longitude = pos.coords.longitude;
        light = {
            Lat: Latitude,
            Long: Longitude,
            color: "green",
            uuid: uuid
        };
        const options = {
            method: 'post',
            data: light
        };
        console.log("Sending Light");
        //cordova.plugin.http.setDataSerializer('json');
        httpClient.post("https://6571c241.ngrok.io/api/v1/stopLights", light, success);
        
    }

    function success(){
        window.plugins.toast.showShortBottom("Light has successfully been recorded.", function(a){ console.log("toast success: " + a)}, function(b){alert('toast error: ' + b)});
    }

    function onLocationError() {
        alert("an error has occured");
    }

    var result = null;
    var logOb = null;
    
    function viewLights(){
        console.log("button pressed");
        window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(dir){
            console.log("got main dir", dir.name);
            dir.root.getFile('lights.csv', {
                create: true,
                exclusive: false
            }, function(file){
                var csv = '';
                for (light in lights){
                    csv = csv + "" + light['time'] + "," +  light['Lat'] + "," + light['Long'] + "," + light['color'] + "\n";
                }
                writeLog(file, csv);
            });
        });
    }

    function writeLog(dir, str){
        dir.createWriter(function(fileWriter){
            fileWriter.onwriteend = function(){
                console.log("Successful file write....");
                readFile(dir);
            }

            fileWriter.onerror = function(e){
                console.log("Failed file write: " + e.toString());
            }

            var data = new Blob([str], {type: 'text/plain'});

            fileWriter.write(data);
        });
    }

    function readFile(fileEntry){
        fileEntry.file(function(file){
            var reader = new FileReader();

            reader.onloadend = function() {
                console.log("Successful fule read: " + this.result);
                displayFileData(fileEntry.fullPath = ": " + this.result);
            
            };

            reader.readAsText(file);

        }, onErrorReadFile);
    }



});
