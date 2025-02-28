"use strict";
class DateClass {
    constructor(timeZone) {
        this.timeZone = timeZone;
    }
    getTime() {
        var d = new Date();
        return d.getTime();
    }
    getMonth() {
        var d = new Date();
        return d.getMonth();
    }
    getTimeZone() {
        return this.timeZone;
    }
}
const dateObject = new DateClass("IND");
const response = dateObject.getTime();
console.log(response);
