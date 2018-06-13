
// import moment from './../lib/moment.min.js';
console.log(moment().format('MMM Do YY'));
console.log(moment().format('HH:mm:ss a'));


// MODEL

let url = '/src/scripts/dummy-data.js';
let rawData = null;  // a place to dump the returned data from getJSON

// this represents the converted local memory version of what we get from db
// id from entries corresponds to array index
// array format is required by chart.js lib
const global_data_arrays = {
    sys1: {
        dates: [],
        times: [],
        pH: [],
        ammonia: [],
        nitrite: [],
        nitrate: [],
        notes: [],
        temp: [],
        tempUnit: 'C', // C or F
        timeFormat: '' // 12 or 24
    }
};


// FUNCTIONS

const retrieveJSON = () => {
    let request = new XMLHttpRequest();
    console.log(request);
    request.open('GET', url, true);
    request.onload = () => {
        console.log(request.status);
        if (request.status >= 200 && request.status < 400) {
            // Success!
            console.log('json success');
            rawData = JSON.parse(request.responseText);
        } else {
            // We reached our target server, but it returned an error
            console.log(`reached server, but error returning JSON. status: ${request.status}`)

        }
    };
    request.onerror = function() {
        // There was a connection error of some sort
    };
    request.send();
};





const populateChartData = ( {dates, times, pH, ammonia, nitrite, nitrate} = global_data_arrays.sys1) => {
    // global_data_entries.forEach((entry) => {
    rawData.forEach((entry) => {
        // retrieve timestamp
        // unix -> moment obj -> formatted date/time
        const moment_obj = moment.unix(entry.date);
        const date = moment_obj.format('MMM Do YY');
        const time = moment_obj.format('HH:mm:ss a');

        dates[entry.id] = date;
        times[entry.id] = time;
        pH[entry.id] = entry.pH;
        ammonia[entry.id] = entry.ammonia;
        nitrite[entry.id] = entry.nitrite;
        nitrate[entry.id] = entry.nitrate;
    })
};

// promise
//when

//then


let promise1 = new Promise((resolve, reject) => {
    retrieveJSON();
    resolve('Success!');
});

promise1.then(function(value) {
    populateChartData();
    console.log(value);
    // expected output: "Success!"
});

console.log(global_data_arrays);