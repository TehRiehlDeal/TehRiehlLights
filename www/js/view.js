function getLights(){
    var greenLights = [];
    var redLights = [];
    $.get("https://6f01bc87.ngrok.io/api/v1/stopLights", function (data, textStatus, jqXHR) {
        //console.log(data['stopLights'][0]);
        for (var i = 0; i < data['stopLights'].length; i++) {
            var light = data['stopLights'][i];
            if (light['color'] == "green" && light['uuid'] == uuid) {
                greenLights.push(light);
            } else if (light['color'] == "red" && light['uuid'] == uuid) {
                redLights.push(light);
            }
        }
        for (var i = 0; i < greenLights.length; i++) {
            //console.log(light);
            $('.greenTable').append("<tr><td>" + greenLights[i]['time'].split("GMT")[0] + "</td><td>" + greenLights[i]['Lat'] + "</td><td>" + greenLights[i]["Long"] + "</td></tr>");
        }
        for (var i = 0; i < redLights.length; i++) {
            $('.redTable').append("<tr><td>" + redLights[i]['time'].split("GMT")[0] + "</td><td>" + redLights[i]['Lat'] + "</td><td>" + redLights[i]["Long"] + "</td></tr>");
        }
    });
}
