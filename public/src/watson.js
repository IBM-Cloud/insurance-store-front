var PolicyBuilder = function () {

}

PolicyBuilder.prototype.selectedCriteria = [];

PolicyBuilder.prototype.criteria = [{
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

PolicyBuilder.prototype.selectCriteria = function (label) {

    var newSelections = [];

    var found = false;

    this.selectedCriteria.forEach(function (criteria) {

        if (criteria === label) {
            found = true;
            var element = document.getElementById(label);
            element.className = 'criteria';
        } else {
            newSelections.push(criteria);
            var element = document.getElementById(criteria);
            element.className = 'selectedCriteria';
        }
    })

    if (found === false) {
        newSelections.push(label);
        var element = document.getElementById(label);
        element.className = 'selectedCriteria';
    }

    this.selectedCriteria = newSelections;

    var processButton = document.getElementById('process');

    if (this.selectedCriteria.length > 0) {
        processButton.disabled = false;
    } else {
        processButton.disabled = true;
    }
}

PolicyBuilder.prototype.makeCritria = function (label, image) {

    var element = document.createElement('div');
    element.className = 'criteria';
    element.id = label;
    element.innerHTML = '<img src = "images/wash/' + image + '" class = "criteria-image">' +
        '<label class = "criteria-label">' + label + '</label>';

    var pb = this;
    element.onclick = function () {
        pb.selectCriteria(label)
    };
    return element;
}

PolicyBuilder.prototype.addCriteria = function () {

    var elements = document.getElementById('elements');

    var pb = this;

    pb.criteria.forEach(function (c) {
        var element = pb.makeCritria(c.label, c.image);
        elements.appendChild(element);
    })

    var processButton = document.getElementById('process');
    processButton.disabled = true;
}

PolicyBuilder.prototype.process = function () {


}

var builder = new PolicyBuilder();

function process() {
    builder.process();
}

window.onload = builder.addCriteria();