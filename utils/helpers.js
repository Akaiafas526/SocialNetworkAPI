const formatTimeStamp = (time) => {
    // Using JavaScript Date methods, we get and format the month, date, and year
    // We need to add one to the month since it is returned as a zero-based value
    return `${new Date(time).getMonth() + 1}/${new Date(time).getDate()}/${
      // We add five years to the 'year' value to calculate the end date
      new Date(time).getFullYear() + 5
    }`;
}

module.exports = formatTimeStamp

