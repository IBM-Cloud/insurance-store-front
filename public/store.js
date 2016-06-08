function openTravel() {
    console.log('click');

    window.location = "travel.html"
}

function makeCritria(label, image) {
    var critria = '<div class = "criteria">' +
        '<img src = "images/wash/' + image + 'class = "criteria-image">' +
        '<label class = "criteria-label">' + label + '</label>' +
        '</div>'

    return critria;
}


function addCriteria() {

    var criteria = [{
        "label": "Trip Duration",
        "image": "calendar.svg"
    }, {
        "label": "Recommendation",
        "image": "recommendation.svg"
    }, {
        "label": "Cost",
        "image": "cost.svg"
    }, {
        "label": "Coverage",
        "image": "guage.svg"
    }, {
        "label": "Care",
        "image": "health.svg"
    }, {
        "label": "Value of Trip",
        "image": "world.svg"
    }]

    var elements = document.getElementById('elements');

    criteria.forEach(function (c) {
        var element = makeCritria(c.label, c.image);
        elements.appendChild(element);
    })


}


function openWatson() {
    console.log('click');
    window.location = "watson.html";
}