const axios = require('axios')
const API_BASE_URL = 'https://covid-api.mmediagroup.fr/v1/'
const LAST_DAYES = 10

exports.handler = async (event) => {

    const result = await axios.get(API_BASE_URL+'history', {
        params: {
          status: "recovered"
        }
      });
      const countries = result.data;
      delete countries['Global']
      
      let recovered = []
      
      for (const cuntry in countries) {
        let dates_array = Object.values(countries[cuntry].All.dates);
        let data = dates_array.slice(0 , LAST_DAYES);
        let sum = data[0] - data[LAST_DAYES-1];
        let obj = {
            cuntry: cuntry,
            amount_of_recovred: sum
        }
        recovered.push(obj)
      }
    
      const top5cuntries = recovered.sort((a, b) => b.amount_of_recovred - a.amount_of_recovred).slice(0,5)
      return top5cuntries;
};