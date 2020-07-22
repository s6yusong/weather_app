const trimAndLowerCase = (str) => {
  return str.toLowerCase().split(/\s/).join('')
};
export const filterPositions = (list, key) => {
  return list.filter(item => trimAndLowerCase(item).includes(trimAndLowerCase(key)));
}

export const dateBuilder = (d) => {
  let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();
  return `${day} ${date} ${month} ${year}`;
};

export const convertTimestamp = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const hours = date.getHours();
  const minutes = "0" + date.getMinutes();
  return `${hours}:${minutes.substr(-2)}`
};