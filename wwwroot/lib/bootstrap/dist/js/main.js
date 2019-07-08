function IsValidZipCode(zip) {
    var isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip);
    if (isValidZip) {
        return true;
    }
    //zip is also "invalid" if the fetch returns anything other than 200
    return false;
}

function failureNotice() {
    $("#errorNotice").show();
}

function getWeather() {
    var zipcode = $("#zipcode").val();
    $("#errorNotice").hide();
    if (IsValidZipCode(zipcode)) {
        console.log("Entered zipcode: " + zipcode + " is valid");
        $("#weatherTable").show();
        callAPI();
    } else {
        console.log("Entered zipcode: " + zipcode + " is not valid");
        $("#errorNotice").show();
    }
}

function callAPI() {
    $("#weatherTable tbody").html("");
    var apiKey = "b05d35d5687b2131b5560c51f64dd272";
    var zipcode = $("#zipcode").val();
    var url = 'https://api.openweathermap.org/data/2.5/forecast?zip=' + zipcode + ',us&appid=' + apiKey + '&units=imperial';
    fetch(url)
        .then(function (resp) {
            if (resp.status != 200) {
                failureNotice();
            }
                return resp.json();
        })
        .then(function (data) {
                $("#cityName").html("Displaying weather for " + data.city.name + ", " + $("#zipcode").val() + " " + data.city.country);

                for (var hour = 0; hour < data.list.length; hour++) {
                    $("#weatherTable tbody").append(
                        "<tr><td>" + data.list[hour].dt_txt + "</td><td>" + data.list[hour].main.temp.toFixed(1) + "° F</td><td>" + data.list[hour].main.pressure + " hPa</td>"
                    );
                }
        });
}