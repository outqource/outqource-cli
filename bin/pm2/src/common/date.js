"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecentYearStartEnd = exports.getTodayStartEnd = exports.weekNumberByMonth = void 0;
var weekNumberByMonth = function (dateFormat) {
    var inputDate = new Date(dateFormat);
    var year = inputDate.getFullYear();
    var month = inputDate.getMonth() + 1;
    var weekNumberByThurFnc = function (paramDate) {
        var year = paramDate.getFullYear();
        var month = paramDate.getMonth();
        var date = paramDate.getDate();
        var firstDate = new Date(year, month, 1);
        var lastDate = new Date(year, month + 1, 0);
        var firstDayOfWeek = firstDate.getDay() === 0 ? 7 : firstDate.getDay();
        var lastDayOfweek = lastDate.getDay();
        var lastDay = lastDate.getDate();
        var firstWeekCheck = firstDayOfWeek === 5 || firstDayOfWeek === 6 || firstDayOfWeek === 7;
        var lastWeekCheck = lastDayOfweek === 1 || lastDayOfweek === 2 || lastDayOfweek === 3;
        var lastWeekNo = Math.ceil((firstDayOfWeek - 1 + lastDay) / 7);
        var weekNo = Math.ceil((firstDayOfWeek - 1 + date) / 7);
        if (weekNo === 1 && firstWeekCheck)
            weekNo = 'prev';
        else if (weekNo === lastWeekNo && lastWeekCheck)
            weekNo = 'next';
        else if (firstWeekCheck)
            weekNo = weekNo - 1;
        return weekNo;
    };
    var weekNo = weekNumberByThurFnc(inputDate);
    if (weekNo === 'prev') {
        var afterDate = new Date(year, month - 1, 0);
        year = month === 1 ? year - 1 : year;
        month = month === 1 ? 12 : month - 1;
        weekNo = weekNumberByThurFnc(afterDate);
    }
    if (weekNo === 'next') {
        year = month === 12 ? year + 1 : year;
        month = month === 12 ? 1 : month + 1;
        weekNo = 1;
    }
    return { year: year, month: month, weekNo: weekNo };
};
exports.weekNumberByMonth = weekNumberByMonth;
var getTodayStartEnd = function () {
    var todayStart = new Date();
    todayStart.setHours(0);
    todayStart.setMinutes(0);
    todayStart.setSeconds(0);
    var todayEnd = new Date();
    todayEnd.setHours(23);
    todayEnd.setMinutes(59);
    todayEnd.setSeconds(59);
    return {
        todayStart: todayStart,
        todayEnd: todayEnd,
    };
};
exports.getTodayStartEnd = getTodayStartEnd;
var getRecentYearStartEnd = function (target) {
    var startAt = new Date();
    startAt.setFullYear(startAt.getFullYear() - target, startAt.getMonth(), startAt.getDate());
    var endAt = new Date();
    return {
        startAt: startAt,
        endAt: endAt,
    };
};
exports.getRecentYearStartEnd = getRecentYearStartEnd;
