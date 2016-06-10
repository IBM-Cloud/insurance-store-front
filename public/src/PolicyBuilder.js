var PolicyBuilder = function () {

}

PolicyBuilder.prototype.selectedCriteria = [];


PolicyBuilder.prototype.DURATION = 0;
PolicyBuilder.prototype.REVIEWS = 1;
PolicyBuilder.prototype.PEOPLE = 2;
PolicyBuilder.prototype.COST = 3;
PolicyBuilder.prototype.DEDUCTABLE = 4;
PolicyBuilder.prototype.VALUE = 4;

PolicyBuilder.prototype.criteria = [];

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

    this.get('./data/model.json', function (data) {

        pb.criteria = data;

        pb.criteria.forEach(function (c) {
            var element = pb.makeCritria(c.label, c.image);
            elements.appendChild(element);
        })

        var processButton = document.getElementById('process');
        processButton.disabled = true;
    });
}


PolicyBuilder.prototype.makeEvaluation = function (criteria) {

    var evaluation = document.createElement('div');
    evaluation.className = 'evaluation';
    evaluation.innerHTML =

        '<img src = "images/wash/' + criteria.image + '" class = "evaluation-image">' +
        '<label class = "criteria-label">' + criteria.label + '</label>' +
        '<label class = "slider-label" >' + criteria.values[0] + '</label >' +
        '<input class = "slider" id = "' + criteria.label + 'Slider' + '" type = "range" min = "' + criteria.min + '"max = "' + criteria.max + '"step = "1" value ="0"/>' +
        '<label class = "slider-label">' + criteria.values[criteria.max] + '</label>' + '<div class="consideration" id="' + criteria.label + 'Consideration' + '">' + criteria.values[0] + '</div>';

    return evaluation;
}


PolicyBuilder.prototype.addRadar = function () {

    var data = {
        labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
        datasets: [
            {
                label: "My First dataset",
                backgroundColor: "rgba(179,181,198,0.2)",
                borderColor: "rgba(179,181,198,1)",
                pointBackgroundColor: "rgba(179,181,198,1)",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(179,181,198,1)",
                data: [65, 59, 90, 81, 56, 55, 40]
        },
            {
                label: "My Second dataset",
                backgroundColor: "rgba(255,99,132,0.2)",
                borderColor: "rgba(255,99,132,1)",
                pointBackgroundColor: "rgba(255,99,132,1)",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(255,99,132,1)",
                data: [28, 48, 40, 19, 96, 27, 100]
        }
    ]
    };


    var polar = document.createElement('canvas');
    polar.height = 280;
    polar.width = 280;

    var radar = document.getElementById('radar');
    radar.appendChild(polar);

    var ctx = polar.getContext("2d");

    var myRadarChart = new Chart(ctx, {
        type: 'radar',
        data: data
    });
}

PolicyBuilder.prototype.sliderChange = function (element) {

    var pb = this;

    pb.criteria.forEach(function (data) {

        if (data.label === element) {
            var slider = document.getElementById(data.label + 'Slider');
            var consideration = document.getElementById(data.label + 'Consideration');
            consideration.innerHTML = data.values[slider.value];
        }
    });

    pb.send();
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

                var slider = document.getElementById(data.label + 'Slider');
                slider.addEventListener('change', function () {
                    pb.sliderChange(data.label);
                }, false);
            }
        });
    })
    var output = document.getElementById('output');
    output.style.display = 'flex';

    //    pb.addRadar();
}


PolicyBuilder.prototype.addStars = function (option) {

    var stars = '<div class="policyRating">';

    var amount = option.values['levelCare'];

    for (count = 0; count < amount; count++) {
        stars = stars + '<img class="starImage" src="images/wash/star.svg">'
    }

    stars = stars + '</div>'

    return stars;
}


PolicyBuilder.prototype.buildFeedback = function (option) {

    console.log(option.values);

    var policyFeedback = document.createElement('div');
    policyFeedback.className = 'policyFeedback';

    var structure =

        '<div class="policyTitle">' +
        '<div class="policyName">' + option.name + '</div>' +
        '</div>' +

        '<div class="policyDetails">' +

        '<div class = "policyData" > ' +
        '<label class="policyLabel">Coverage</label><span class="policyContent">$' + option.values['amount'] + '</span>' +
        '</div>' +

        '<div class="policyData">' +
        '<label class="policyLabel">Cost</label><span class="policyContent">$' + option.values['cost'] + '</span>' +
        '</div>';

    structure = structure + this.addStars(option);

    structure = structure +

        '</div>' +

        '<div class = "policyAction">' +
        '<div class = "buyPolicy" onclick = "openWatson()"> Buy now </div>' +
        '</div> '

    policyFeedback.innerHTML = structure;

    return policyFeedback;
}

/**
 * Builds parameters for sending to the server
 */

PolicyBuilder.prototype.constructPostData = function () {
    var parameters = {
        "tripDuration": 5,
        "addTravelers": [18, 9],
        "cancelCov": false,
        "tripCost": 5000
    };

    var durationData = document.getElementById(this.criteria[this.DURATION].sliderId);

    if (durationData) {
        parameters.tripDuration = this.criteria[this.DURATION].input[durationData.value];
    }

    var peopleData = document.getElementById(this.criteria[this.PEOPLE].sliderId);

    if (peopleData) {

        var count = this.criteria[this.PEOPLE].input[peopleData.value]

        var travelers = [];

        for (var c = 0; c < count; c++) {
            travelers.push(18);
        }

        parameters.addTravelers = travelers;
    }

    parameters = JSON.stringify(parameters);

    return parameters;
}


/**
 * Sends the policy parameters to the server
 */

PolicyBuilder.prototype.send = function () {

    var pb = this;

    var anchor = document.getElementById('policies');
    anchor.innerHTML = '';
    anchor.innerHTML = '<img src="./images/loading.svg">';

    setTimeout(function () {
        xmlhttp = new XMLHttpRequest();
        var url = "/api/tradeoff";
        xmlhttp.open("POST", url, true);
        xmlhttp.setRequestHeader("Content-type", "application/json");
        xmlhttp.onreadystatechange = function () { //Call a function when the state changes.
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

                var data = JSON.parse(xmlhttp.responseText);

                var anchor = document.getElementById('policies');

                var options = data.body.problem.options;
                anchor.innerHTML = '';

                options.forEach(function (option) {
                    var element = pb.buildFeedback(option);
                    anchor.appendChild(element);
                })
                console.log(data.body.problem.options);
            }
        }

        var parameters = pb.constructPostData();

        xmlhttp.send(parameters);
    }, 2000);
}

/**
 * A convenience function for http get
 * @param {String} url @param{Function} callback
 */

PolicyBuilder.prototype.get = function (path, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            callback(JSON.parse(xmlhttp.responseText));
        }
    }
    xmlhttp.open("GET", path, true);
    xmlhttp.send();
}


var builder = new PolicyBuilder();

function process() {
    builder.process();
}

window.onload = builder.addCriteria();