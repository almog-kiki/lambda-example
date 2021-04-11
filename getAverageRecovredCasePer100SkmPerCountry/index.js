const axios = require('axios')
const API_BASE_URL = 'https://covid-api.mmediagroup.fr/v1/'

exports.handler = async (event) =>  {
  const result = await axios.get(API_BASE_URL+'cases',{});
  const countries = result.data;
  delete countries['Global']
  
  let recovered = []

  for (const countryKey in countries) {
    const countryObj = countries[countryKey].All;
    let avg = countryObj.recovered/(countryObj.sq_km_area/100)
    let obj = {
      country: countryKey,
      avg: avg.toFixed(2)
    }
    recovered.push(obj)
  }

  return recovered
};