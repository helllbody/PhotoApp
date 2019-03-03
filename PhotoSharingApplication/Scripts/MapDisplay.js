var map;
var infoBox;

function GetMap() {

    //Set up the map
    map = new Microsoft.Maps.Map(document.getElementById("mapDiv"), { credentials: "Aiq3Kpbw982jT5CKPZI2EWoAKRs271TOYzgxy9MjzAxYmxUTRysIpD79M9JxsjhQ ", zoom: 1 });

    //Add the infobox but hide it for now
    infoBox = new Microsoft.Maps.Infobox(new Microsoft.Maps.Location(0, 0), { visible: false, offset: new Microsoft.Maps.Point(0, 20) });
    infoBox.setMap(map);

    GetPhotos(webApiUrl);
}

function DisplayInfoBox(e) {
    if (e.targetType == 'pushpin') {

        //Formulate the HTML for the infobox
        var htmlPinContent = "<div class='push-pin'>" + 
            "<a href='" + displayUrl + e.target.ID + "'>" +
            "<p>" + e.target.Title + "</p>" +
            "<img height='80' width='80' src='" + pictureUrl + e.target.ID + "' />" +
            "</a>" +
            "</div>";

        //Set the location of the infobox and display it with the HTML
        infoBox.setLocation(e.target.getLocation());
        infoBox.setOptions({ visible: true, showPointer: true, htmlContent: htmlPinContent });
    }
}

function GetPhotos(serviceUrl) {
    $.support.cors = true;

    $.ajax({
        url: serviceUrl,
        type: 'GET',
        dataType: 'json',
        success: DisplayPics,
        error: OnError
    });
}

function DisplayPics(response) {
    var location;
    var pin;

    $.each(response, function (index, photo) {
        location = new Microsoft.Maps.Location(photo.Latitude, photo.Longitude);
        pin = new Microsoft.Maps.Pushpin(location);

        pin.Title = photo.Title;
        pin.ID = photo.PhotoID;

        Microsoft.Maps.Events.addHandler(pin, 'click', DisplayInfoBox);

        map.entities.push(pin);
    });
}

function OnError(response) {
    alert("Could not obtain the picture coordinates");
}



