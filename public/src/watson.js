var PolicyBuilder = function () {

}

PolicyBuilder.prototype.selectedCriteria = [];

PolicyBuilder.prototype.criteria = [{
    "label": "Duration",
    "image": "calendar.svg",
    "min": 1,
    "max": 5
    }, {
    "label": "Reviews",
    "image": "recommendation.svg",
    "min": 1,
    "max": 5
    }, {
    "label": "Cost",
    "image": "cost.svg",
    "min": 1,
    "max": 5
    }, {
    "label": "Coverage",
    "image": "guage.svg",
    "min": 1,
    "max": 5
    }, {
    "label": "Quality",
    "image": "health.svg",
    "min": 1,
    "max": 5
    }, {
    "label": "Value",
    "image": "world.svg",
    "min": 1,
    "max": 5
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
    var instructions = document.getElementById('instructions');

    if (this.selectedCriteria.length > 0) {
        processButton.disabled = false;
        instructions.className = 'disabledInstructions';
    } else {
        processButton.disabled = true;
        instructions.className = 'instructions';
    }
}

PolicyBuilder.prototype.makeCritria = function (label, image) {

    var element = document.createElement('div');
    element.className = 'criteria';
    element.id = label;
    element.innerHTML = '<img src = "images/wash/' + image + '" class = "criteria-image">' +
        '<label class = "label">' + label + '</label>';

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


PolicyBuilder.prototype.makeEvaluation = function (criteria) {

    var evaluation = document.createElement('div');
    evaluation.className = 'evaluation';
    evaluation.innerHTML =

        '<img src = "images/wash/' + criteria.image + '" class = "criteria-image">' +
        '<label class = "criteria-label">' + criteria.label + '</label>' +
        '<label class = "slider-label" >' + criteria.min + '</label >' +
        '<input class = "slider" id = "' + criteria.name + '" type = "range" min = "' + criteria.min + '"max = "' + criteria.max + '"step = "0.1"/>' +
        '<label class = "slider-label">' + criteria.max + '</label>';

    return evaluation;
}

PolicyBuilder.prototype.process = function () {

    var input = document.getElementById('elements');
    input.style.display = 'none';

    var button = document.getElementById('process');
    button.style.display = 'none';

    var filter = document.getElementById('filter');

    var pb = this;

    pb.selectedCriteria.forEach(function (criteria) {

        pb.criteria.forEach(function (data) {

            if (data.label === criteria) {

                var evaluation = pb.makeEvaluation(data);
                filter.appendChild(evaluation);
            }
        });
    })
    var output = document.getElementById('output');
    output.style.display = 'inherit';

}

var builder = new PolicyBuilder();

function process() {
    builder.process();
}

window.onload = builder.addCriteria();