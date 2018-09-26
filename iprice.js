var increment = 0;
var sessions = 0;

function addCommas(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

function daysInMonth(currentDate) {
    return new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
}

function real_traffic() {
    $.ajax({
        url: "https://vivid-inferno-7935.firebaseIO.com/metrics/ga.json",
        context: document.body,
        success: function (data) {
            sessions = data[0];
            increment = data[1];
            var goal = data[2];
            var day = data[3];
            var time = data[4];

            var wow = data[6];
            var mom = data[5];

            var currentDate = new Date();
            var goalAchievement = sessions / goal * 100;
            var goalTargeted = ((goal * currentDate.getDate()) / daysInMonth(currentDate)) / goal * 100;

            e = document.getElementById('goal');
            e.innerHTML = addCommas(goal);

            e = document.getElementById('day');
            e.innerHTML = day;

            e = document.getElementById('time');
            e.innerHTML = time;

            e = document.getElementById('sessions');
            e.innerHTML = addCommas(sessions);

            e = document.getElementById('progressbar_achieved');
            e.value = addCommas(goalAchievement);

            e = document.getElementById('progressbar_target');
            e.value = addCommas(goalTargeted);

            if (wow != undefined) {
                e = document.getElementById('month');
                e.innerHTML = addCommas(mom);
            }

            if (mom != undefined) {
                e = document.getElementById('week');
                e.innerHTML = addCommas(wow);
            }
        }
    });
}

function perceptual_traffic() {
    sessions += increment;
    element = document.getElementById('sessions');
    element.innerHTML = addCommas(parseInt(sessions));
}


function quote() {
    $.ajax({
        url: "https://talaikis.com/api/quotes/random/",
        context: document.body,
        success: function (data) {
            e = document.getElementById('quoteBody');
            e.innerHTML = addCommas(data.quote);

            e = document.getElementById('quoteAuthor');
            e.innerHTML = addCommas(data.author);

        }
    });
}


real_traffic();
quote();
window.setInterval(quote, 60000);
window.setInterval(real_traffic, 30000);
window.setInterval(perceptual_traffic, 1000);

