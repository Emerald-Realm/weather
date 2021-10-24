import { createStore, storeKey } from 'vuex'
import service from "../service"
import timezone from '../timezone'

export default createStore({
  state: {
    weather: {},
    countries: [],
    dataIsRecieved: false
  },
  mutations: {
    NEW_WEATHER(state, message) {
      state.weather = message
      state.dataIsRecieved = true
    },
    UPDATE_WEATHER(state) {
      service
      .getWeather()
      .then(response => {
        state.weather = response.data.data[0]
        state.dataIsRecieved = true
        console.log(response)
      })
      .catch(error => {
        console.log("there was an error:", error.response)
        state.dataIsRecieved = false
      })
        },
      GET_COUNTRIES(state) {
        timezone
        .timeZone()
        .then( response => {
          state.countries = response.data
        })
        .catch( err => {
          console.log('time error: ', err.response)
        })
      },
  },
  actions: {
    updateWeather(context) {
      context.commit("UPDATE_WEATHER")
    },
    getZones(context) {
      context.commit("GET_COUNTRIES")
    }
  },
  modules: {
  }
})
