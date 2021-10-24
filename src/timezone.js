import axios from "axios"

const timeZone = axios.create({
  baseURL: "https://referential.p.rapidapi.com/v1/country",
  headers: {
    "x-rapidapi-host": "referential.p.rapidapi.com",
    "x-rapidapi-key":
      "dc0e59b70cmsh13a354564192b14p11256djsne43fd5302322",
  }
})

export default {
  timeZone() {
    return timeZone.get()
  }
}





// import axios from "axios"

// const options = {
//   method: "GET",
//   url: "https://referential.p.rapidapi.com/v1/country",
//   params: {
//     fields:
//       "currency,currency_num_code,currency_code,continent_code,currency,iso_a3,dial_code",
//   },
//   headers: {
//     "x-rapidapi-host": "referential.p.rapidapi.com",
//     "x-rapidapi-key":
//       "dc0e59b70cmsh13a354564192b14p11256djsne43fd5302322",
//   },
// };

// export default {
//   axios.request(options)
//     .then(function (response) {
//       console.log(response.data.map(({ key }) => key));
//     })
//     .catch(function (error) {
//       console.error(error);
//     })
// }