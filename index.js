const createEmployeeRecord = function(arr) {
    const employee = {
        firstName: arr[0],
        familyName: arr[1], 
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee
};

const createEmployeeRecords = function(employees) {
    return employees.map(function(employee) { // why is this row also being returned?
        return createEmployeeRecord(employee)
    })
};

const createTimeInEvent = function(employee, dateTime) {
    let [date, hour] = dateTime.split(" ")
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    })
    return employee // remember JS functions have NO IMPLICIT RETURN VALUE
};

const createTimeOutEvent = function(employee, dateTime) {
    let [date, hour] = dateTime.split(" ")
    
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    })
    return employee
};

const hoursWorkedOnDate = function(employee, date) {
    let timeInRecord = employee.timeInEvents.find(e => e.date === date)
    let timeOutRecord = employee.timeOutEvents.find(e => e.date === date)
    return (timeOutRecord.hour - timeInRecord.hour)/100
};

const wagesEarnedOnDate = function(employee, date) {
    return hoursWorkedOnDate(employee, date) * employee.payPerHour
};

const allWagesFor = function(employee) {
    let total = 0
    let dates = []
    for (let e of employee.timeInEvents) {dates.push(e.date)}
    for (let x of dates) {
        total += wagesEarnedOnDate(employee, x)
    }
    return total
};

const calculatePayroll = function(employees) {
    // let total = 0
    // for (let employee of employees) {
    //     total += allWagesFor(employee)
    // }
    // return total

    return employees.reduce(function(total, employee) {
        return total + allWagesFor(employee)
    }, 0)
};

const findEmployeeByFirstName = function(employees, firstName) {
    // for (let employee of employees) {
    //     if (employee.firstName === firstName) {
    //         return employee
    //     }
    // }
    return employees.find(e => e.firstName === firstName)
}