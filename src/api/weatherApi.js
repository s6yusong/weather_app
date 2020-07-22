
const api = {
  key: '5ba152510be22866ec0740a597e492d0',
  base: 'https://api.openweathermap.org/data/2.5/'
};

export const weatherApi = key => fetch(`${api.base}weather?q=${key}&units=metric&APPID=${api.key}`)
    .then(res => res.json())
    .then(result => result)
    .catch(error => error);
