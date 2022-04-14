const formatTimeStamp = (time) => {
  return `${new Date(time).getMonth() + 1}/${new Date(time).getDate()}/${
    new Date(time).getFullYear() + 5
  }`;
};

module.exports = formatTimeStamp;
