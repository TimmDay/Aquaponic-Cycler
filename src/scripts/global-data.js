
// import moment from './../lib/moment.min.js';

console.log(moment().format('MMM Do YY'));
console.log(moment().format('HH:mm:ss a'));

const global_data_entries = [
    {
        id:10,
        date: "Jun 11th 18",
        pH: 6.8,
        ammonia: 0,
        nitrite: 0,
        nitrate: 80
    },
    {
        id:9,
        date: "Jun 10th 18",
        pH: 7.2,
        ammonia: 0,
        nitrite: 0.5,
        nitrate: 40
    },
    {
        id:8,
        date:"Jun 9th 18",
        pH: 6.6,
        ammonia: 0,
        nitrite: 2,
        nitrate: 20
    },
    {
        id:7,
        date: "Jun 8th 18",
        pH: 7.2,
        ammonia: 1,
        nitrite: 5,
        nitrate: 5
    },
    {
        id:6,
        date: "Jun 7th 18",
        pH: 7.4,
        ammonia: 2,
        nitrite: 5,
        nitrate: 5
    },
    {
        id:5,
        date: "Jun 6th 18",
        pH: 7.4,
        ammonia: 4,
        nitrite: 5,
        nitrate: 0
    },
    {
        id:4,
        date: "Jun 5th 18",
        pH: 8.4,
        ammonia: 4,
        nitrite: 5,
        nitrate: 0
    },
    {
        id:3,
        date: "Jun 4th 18",
        pH: 8,
        ammonia: 7,
        nitrite: 2,
        nitrate: 0
    },
    {
        id:2,
        date: "Jun 3rd 18",
        pH: 8.6,
        ammonia: 8,
        nitrite: 0,
        nitrate: 0
    },
    {
        id:1,
        date: "Jun 2nd 18",
        pH: 8.0,
        ammonia: 8,
        nitrite: 0,
        nitrate: 0
    },
    {
        id:0,
        date: "Jun 1st 18",
        pH: 9.0,
        ammonia: 8.8,
        nitrite: 0,
        nitrate: 0
    },
];




// id from entries corresponds to array index
const global_data_arrays = {
    sys1: {
        dates: [],
        pH: [],
        ammonia: [],
        nitrite: [],
        nitrate: [],
        time: [],
        temp: [],
        tempUnit: 'C', // C or F
        timeFormat: '' // 12 or 24
    }
};


const populateChartData = ( {dates, pH, ammonia, nitrite, nitrate} = global_data_arrays.sys1) => {
    global_data_entries.forEach((entry) => {
        dates[entry.id] = entry.date;
        pH[entry.id] = entry.pH;
        ammonia[entry.id] = entry.ammonia;
        nitrite[entry.id] = entry.nitrite;
        nitrate[entry.id] = entry.nitrate;
    })
};

populateChartData();