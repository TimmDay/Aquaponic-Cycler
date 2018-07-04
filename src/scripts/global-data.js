
// import moment from './../lib/moment.min.js';
// console.log(moment().format('MMM Do YY'));
// console.log(moment().format('HH:mm:ss a'));


// MODEL
let url = './src/scripts/dummy-data.json';

// this represents the converted local memory version of what we get from db
// id from entries corresponds to array index
// array format is required by chart.js lib
const global_data_arrays = {
    sys1: {
        id: [],
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

// destructure the arg for destination (global arr. whatever sys)
const populateChartData = ( json, {id, dates, times, pH, ammonia, nitrite, nitrate} = sys_input_destination) => {
    // global_data_entries.forEach((entry) => {

    json.forEach((entry) => {
        // console.log('HI!');
        // console.log(entry);

        // retrieve timestamp from data, convert to date for display
        // unix -> moment obj -> formatted date/time
        const moment_obj = moment.unix(entry.date);
        const date = moment_obj.format('MMM Do YY');
        const time = moment_obj.format('HH:mm:ss a');

        // console.log(entry.date);
        id.push(entry.id);
        dates[entry.id] = date;
        times[entry.id] = time;
        pH[entry.id] = entry.pH;
        ammonia[entry.id] = entry.ammonia;
        nitrite[entry.id] = entry.nitrite;
        nitrate[entry.id] = entry.nitrate;
    })
};


// method is GET
const makeRequest = (method, url) => {
    return new Promise((resolve,reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = () => {
            if (xhr.status === 200) {
                console.log(typeof xhr.response);
                resolve(xhr.response)
            } else {
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = () => {
            reject({
                status: xhr.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });
};

makeRequest('GET',url)
    .then((datums) => {
        // console.log(datums);
        json = JSON.parse(datums);
        populateChartData(json,  global_data_arrays.sys1);
    })
    .catch((err) => {
        console.error('Augh, there was an error!', err.statusText);
    });


console.log(global_data_arrays);
