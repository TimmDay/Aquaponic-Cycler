
// import moment from './../lib/moment.min.js';

console.log(moment().format('MMM Do YY'));
console.log(moment().format('HH:mm:ss a'));

const global_data = {
    sys1: {
        dates: ["Jun 1st 18", "Jun 2nd 18", "Jun 3rd 18", "Jun 4th 18", "Jun 5th 18", "Jun 6th 18","Jun 7th 18","Jun 8th 18","Jun 9th 18","Jun 10th 18"],
        pH: [9.0,9.0,8.6,8.0,8.4,7.4,7.2,7.2,7.0,6.8],
        ammonia: [8,8,8,7,4,2,1,0,0,0],
        nitrite: [0,0,0,2,5,5,5,2.0,0.5,0.0],
        nitrate: [0,0,0,0,0,5,5,20,40,80],
        time: [],
        temp: [],
        tempUnit: 'C', // C or F
        timeFormat: '' // 12 or 24
    }
};

// Eg : 1.js
// function get() {
// // get data somehow
//     window.mydata = { data:"my data"}
// }
// In 2.js, you can access my data using window.mydata