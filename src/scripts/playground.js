/**
 * Created by DAY7RT on 13.06.2018.
 */

console.log('table2 connected');
console.log(moment().format('MMM Do YY'));
console.log(moment().format('HH:mm:ss a'));

const now_unix = moment().unix();
console.log(now_unix);
const nowUnixToDate = moment.unix(now_unix).format('MMM Do YY HH:mm:ss a');
console.log(nowUnixToDate);