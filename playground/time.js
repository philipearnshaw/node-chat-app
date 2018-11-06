var moment = require('moment');

var date = moment();  // current point in time

console.log(date.format());  // 2018-10-23T16:48:26+01:00
console.log(date.format('MMM YYYY'));  // Oct 2018
console.log(date.format('MMM Do, YYYY'));  // Oct 23rd, 2018

var newDate = moment().add(7, 'days').subtract(1, 'months').year(2016).hours(0).minutes(1).seconds(5);
console.log(newDate.format('MMM Do, YYYY'));  // Sep 30th, 2016

var timeOfDay = moment();
console.log(timeOfDay.format('h:mm a'));  // 4:39 pm

var createdAt = 1;
var date = moment(createdAt);
console.log(date.format('h:mm a')); // 1:00am (local timezone taken into account)
