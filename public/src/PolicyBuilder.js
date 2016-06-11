var PolicyBuilder = function () {

}

PolicyBuilder.prototype.selectedCriteria = [];

PolicyBuilder.prototype.MINCATEGORY = 0;
PolicyBuilder.prototype.DURATION = 0;
PolicyBuilder.prototype.PEOPLE = 1;
PolicyBuilder.prototype.REVIEWS = 2;
PolicyBuilder.prototype.COST = 3;
PolicyBuilder.prototype.CANCELLATION = 4;
PolicyBuilder.prototype.VALUE = 5;
PolicyBuilder.prototype.MAXCATEGORY = 6;

PolicyBuilder.prototype.criteria = [];

PolicyBuilder.prototype.radarStatus = false;

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
        instructions.innerHTML = 'Press the evaluate button when ready';
    } else {
        processButton.disabled = true;
        instructions.innerHTML = 'Select your travel insurance priorities';
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

        pb.process();
    });
}


PolicyBuilder.prototype.makeEvaluation = function (criteria) {

    var evaluation = document.createElement('div');
    evaluation.className = 'evaluation';

    var sliderId = criteria.label + 'Slider';

    criteria.sliderId = sliderId;

    evaluation.innerHTML =

        '<img src = "images/wash/' + criteria.image + '" class = "evaluation-image">' +
        '<label class = "criteria-label">' + criteria.label + '</label>' +
        '<label class = "slider-label" >' + criteria.values[0] + '</label >' +
        '<input class = "slider" id = "' + sliderId + '" type = "range" min = "' + criteria.min + '"max = "' + criteria.max + '"step = "1" value ="0"/>' +
        '<label class = "slider-label">' + criteria.values[criteria.max] + '</label>' + '<div class="consideration" id="' + criteria.label + 'Consideration' + '">' + criteria.values[0] + '</div>';

    return evaluation;
}


PolicyBuilder.prototype.radarCalculation = function (item) {

    var dataValues = [10, 10, 10, 10, 10, 10];

    for (var count = this.MINCATEGORY; count < this.MAXCATEGORY; count++) {

        var slider = document.getElementById(this.criteria[count].sliderId);

        if (slider) {
            var graduations = this.criteria[count].max + 1;
            dataValues[count] = slider.value * 100 / graduations;
        }

    }

    return dataValues;
}

PolicyBuilder.prototype.hideRadar = function () {
    var watson = document.getElementById('watson');
    watson.innerHTML = '<img class="glasses" src="images/wash/glasses.svg">View Watson Tradeoffs'
    var radar = document.getElementById('radar');
    radar.style.height = '0';
    radar.style.width = '320px';
    radar.innerHTML = '';
}

PolicyBuilder.prototype.addRadar = function () {

    /* Premise - the web = 100% coverage, so calculate the percentagage
       of each element */

    var dataValues = this.radarCalculation();

    console.log(dataValues);

    var data = {
        labels: ["Duration", "Reviews", "People", "Cost", "Cancelation", "Value"],
        datasets: [
            {
                label: "Insurance Coverage",
                backgroundColor: "rgba(18,170,235,0.3)",
                borderColor: "rgba(18,170,235,1)",
                pointBackgroundColor: "rgba(18,170,235,1)",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(18,170,235,1)",
                data: dataValues
        }
    ]
    };


    var polar = document.createElement('canvas');
    polar.height = 500;
    polar.width = 500;

    var watson = document.getElementById('watson');
    watson.innerHTML = '<img class="glasses" src="images/wash/glasses.svg">Hide Watson Tradeoffs'

    var radar = document.getElementById('radar');
    radar.style.height = '600px';
    radar.style.width = '600px';
    radar.innerHTML = '';

    radar.appendChild(polar);

    var ctx = polar.getContext("2d");

    var myRadarChart = new Chart(ctx, {
        type: 'radar',
        data: data,
        options: {
            scale: {
                ticks: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    })
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

    //    pb.addRadar();
}


PolicyBuilder.prototype.process = function () {

    var instructions = document.getElementById('instructions');
    instructions.innerHTML = 'Adjust your levels';

    var input = document.getElementById('elements');
    input.style.display = 'none';

    var button = document.getElementById('process');
    button.style.display = 'none';

    var filter = document.getElementById('filter');

    var pb = this;

    pb.criteria.forEach(function (criteria) {
        if (criteria.type === 'Mandatory') {
            pb.selectedCriteria.push(criteria.label);
        }
    })

    //    pb.selectedCriteria.forEach(function (criteria) {

    pb.criteria.forEach(function (data) {

        //            if (data.label === criteria) {

        var evaluation = pb.makeEvaluation(data);
        filter.appendChild(evaluation);

        var slider = document.getElementById(data.label + 'Slider');
        slider.addEventListener('change', function () {
            pb.sliderChange(data.label);
        }, false);
        //            }
    });
    //    })
    var output = document.getElementById('results');
    output.style.display = 'flex';

    pb.send();
}


PolicyBuilder.prototype.addStars = function (option) {

    var stars = '<div class="policyRating">';

    var amount = option.levelCare;

    for (count = 0; count < amount; count++) {
        stars = stars + '<img class="starImage" src="images/wash/star.svg">'
    }

    stars = stars + '</div>'
    return stars;
}


PolicyBuilder.prototype.buildFeedback = function (option) {

    var policyFeedback = document.createElement('div');
    policyFeedback.className = 'policyFeedback';

    var structure =

        '<div class="policyTitle">' +
        '<div class="policyName">' + option.name + '</div>' +
        '</div>' +

        '<div class="policyDetails">' +

        '<div class = "policyData" > ' +
        '<label class="policyLabel">Coverage</label><span class="policyContent">$' + option.coverage + '</span>' +
        '</div>' +

        '<div class="policyData">' +
        '<label class="policyLabel">Cost</label><span class="policyContent">$' + option.cost + '</span>' +
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

PolicyBuilder.prototype.getSliderData = function (element) {

    var value;

    var data = document.getElementById(this.criteria[element].sliderId);

    if (data) {
        value = this.criteria[element].input[data.value];
    }

    return value;
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

    pb = this;

    var durationData = pb.getSliderData(pb.DURATION)

    if (durationData) {
        parameters.tripDuration = durationData;
    }

    var costData = pb.getSliderData(pb.COST)
    if (costData) {
        parameters.tripCost = costData;
    }

    var reviewData = pb.getSliderData(pb.REVIEWS)
    if (reviewData) {
        parameters.tripCost = reviewData;
    }

    var cancelData = pb.getSliderData(pb.CANCELLATION)
    if (cancelData) {
        parameters.tripCost = cancelData;
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

    console.log(parameters);

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
    anchor.innerHTML = '<img class="loading" src="./images/loading.svg">';

    setTimeout(function () {
        xmlhttp = new XMLHttpRequest();
        var url = "/api/tradeoff";
        xmlhttp.open("POST", url, true);
        xmlhttp.setRequestHeader("Content-type", "application/json");
        xmlhttp.onreadystatechange = function () { //Call a function when the state changes.
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

                var data = JSON.parse(xmlhttp.responseText);

                console.log(data);

                var anchor = document.getElementById('policies');

                var options = data.policies;
                anchor.innerHTML = '';

                console.log(options);

                options.forEach(function (option) {
                    var element = pb.buildFeedback(option);
                    anchor.appendChild(element);
                })
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

function toggleRadar() {

    if (builder.radarStatus === false) {
        builder.addRadar();
        builder.radarStatus = true;
    } else {
        builder.hideRadar();
        builder.radarStatus = false;
    }
}

window.onload = builder.addCriteria();