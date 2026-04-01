function onPageLoad() {
    console.log("Document loaded");

    var url = "https://bengaluru-house-price-lho2.onrender.com/get_location_names";

    $.get(url, function (data, status) {
        if (data && data.locations) {
            $('#uiLocations').empty();
            for (var i = 0; i < data.locations.length; i++) {
                var opt = new Option(data.locations[i]);
                $('#uiLocations').append(opt);
            }
        }
    });
}

function getBHKValue() {
    var bhks = document.getElementsByName("uiBHK");
    for (var i = 0; i < bhks.length; i++) {
        if (bhks[i].checked) {
            return parseInt(bhks[i].value);
        }
    }
    return -1;
}

function getBathValue() {
    var baths = document.getElementsByName("uiBath");
    for (var i = 0; i < baths.length; i++) {
        if (baths[i].checked) {
            return parseInt(baths[i].value);
        }
    }
    return -1;
}

function onClickedEstimatePrice() {
    var sqft = document.getElementById("uiSqft").value;
    var bhk = getBHKValue();
    var bath = getBathValue();
    var location = document.getElementById("uiLocations").value;
    var estPrice = document.getElementById("uiEstimatedPrice");

    if (!sqft || bhk === -1 || bath === -1 || !location) {
        estPrice.innerHTML = "<h2>Please fill all fields</h2>";
        return;
    }

    $.ajax({
        url: "https://bengaluru-house-price-lho2.onrender.com/predict_home_price",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            total_sqft: parseFloat(sqft),
            bhk: bhk,
            bath: bath,
            location: location
        }),
        success: function (data) {
            estPrice.innerHTML =
                "<h2>Estimated Price: ₹ " + data.estimated_price + " Lakh</h2>";
        },
        error: function () {
            estPrice.innerHTML = "<h2>Error getting prediction</h2>";
        }
    });
}

window.onload = onPageLoad;