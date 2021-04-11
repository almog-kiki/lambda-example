const axios = require('axios')
const API_BASE_URL = 'https://covid-api.mmediagroup.fr/v1/'

exports.handler = async (event) => {

  const lastDays = event.last_days
  const topCountry = event.top_country

  const result = await axios.get(API_BASE_URL + 'history', {
    params: {
      status: "recovered"
    }
  });

  const countries = result.data;
  delete countries['Global']
  
  let recovered = []
  
  for (const country in countries) {
    let dates_array = Object.values(countries[country].All.dates);
    let numberOfRecovered = dates_array.slice(0 , lastDays);
    let amountOfRecovred = numberOfRecovered[0] - numberOfRecovered[lastDays-1];
    let obj = {
      country: country,
      amount_of_recovred: amountOfRecovred
    }
    recovered.push(obj)
  }

  const topCountries = recovered.sort((a, b) => b.amount_of_recovred - a.amount_of_recovred).slice(0, topCountry)
  return topCountries
};