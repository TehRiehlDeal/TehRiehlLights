function getLights(){
    var greenLights = [];
    var redLights = [];
    var url = "https://6f01bc87.ngrok.io/api/v1/stopLights/" + device.uuid;
    $.get(url, function (data, textStatus, jqXHR) {
        console.log(data['stopLights'][0]['color']);
        for (var i = 0; i < data['stopLights'].length; i++) {
            var light = data['stopLights'][i];
            if (light['color'] == "green") {
                greenLights.push(light);
            } else if (light['color'] == "red") {
                redLights.push(light);
            }
        }
        for (var i = 0; i < greenLights.length; i++) {
            //console.log(light);
            $('.greenTable').append("<tr><td>" + greenLights[i]['time'].split("GMT")[0] + "</td><td>" + greenLights[i]['Lat'] + "</td><td>" + greenLights[i]["Lon"] + "</td></tr>");
        }
        for (var i = 0; i < redLights.length; i++) {
            $('.redTable').append("<tr><td>" + redLights[i]['time'].split("GMT")[0] + "</td><td>" + redLights[i]['Lat'] + "</td><td>" + redLights[i]["Lon"] + "</td></tr>");
        }
    });
}
