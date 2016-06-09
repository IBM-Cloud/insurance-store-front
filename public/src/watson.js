var PolicyBuilder = function () {

}

PolicyBuilder.prototype.selectedCriteria = [];

PolicyBuilder.prototype.criteria = [{
        "label": "Duration",
        "image": "calendar.svg",
        "min": 0,
        "max": 4,
        "values": ["1 week", "2 weeks", "1 month", "2 months", "1 year"]
    }, {
        "label": "Reviews",
        "image": "recommendation.svg",
        "min": 0,
        "max": 4,
        "values": ["1 star", "2 stars", "3 stars", "4 stars", "5 stars"]
    }, {
        "label": "People",
        "image": "person.svg",
        "min": 0,
        "max": 9,
        "values": ["1 person", "2 people", "3 people", "4 people", "5 people", "6 people", "7 people", "8 people", "9 people", "10 people"]
    }, {
        "label": "Cost",
        "image": "cost.svg",
        "min": 0,
        "max": 4,
        "values": ["Up to $50", "Up to $100", "Up to $200", "Up to $500", "Up to $1000"]
            },
    {
        "label": "Deductable",
        "image": "guage.svg",
        "min": 0,
        "max": 2,
        "values": ["$500", "$300", "none"]
            },
//    {
     //        "label": "Quality",
     //        "image": "health.svg",
     //        "min": 0,
     //        "max": 2,
     //        "values": ["Basic", "Comfortable", "Best"],
     //            },
    {
        "label": "Value",
        "image": "world.svg",
        "min": 0,
        "max": 4,
        "values": ["Up to $1000", "Up to $2000", "Up to $5000", "Up to $10000", "Up to $10000"]
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
    output.style.display = 'inherit';

    //    pb.addRadar();
}

var builder = new PolicyBuilder();

function process() {
    builder.process();
}

window.onload = builder.addCriteria();