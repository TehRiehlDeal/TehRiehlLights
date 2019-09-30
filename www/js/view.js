function getLights(){
    var greenLights = [];
    var redLights = [];
    var url = "https://theriehldeal.com/api/getLights.php?uuid=" + device.uuid;
    $.get(url).done(function(data) {
        var stopLights = JSON.parse(data);
        console.log(stopLights);
        //console.log(data['stopLights'][0]['color']);
        for (var i = 0; i < stopLights.length; i++) {
            var light = stopLights[i];
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
    }).fail(function(jqXHR, textStatus, errorThrown){
        if (textStatus == 'timeout')
            alert('The server is not responding');

        if (textStatus == 'error')
            alert(errorThrown);
    });
}
