
// import moment from './../lib/moment.min.js';

console.log(moment().format('MMM Do YY'));
console.log(moment().format('HH:mm:ss a'));





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


const populateChartData = ( {dates, times, pH, ammonia, nitrite, nitrate} = global_data_arrays.sys1) => {
    global_data_entries.forEach((entry) => {
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

populateChartData();