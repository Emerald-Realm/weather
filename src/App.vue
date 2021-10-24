<template>
  <div class="class">
    <div v-if="this.$store.state.dataIsRecieved" class="weather-widget">
      <p class="temp">
        The temperature is <span class="blue">{{ weather.temp }} Celcius</span>
      </p>
      <p class="city">
        in <span class="blue">{{ weather.city_name }}</span>
      </p>
      <p class="status">
        and the sky has
        <span class="blue">{{ weather.weather.description }}</span>
      </p>
    </div>
    <div v-else class="widget">preloader</div>
    <div class="new-city">
      <p class="bold">Input your country and city to display the current weather</p>
      <div class="stand">
        <select v-model="country">
          <option disabled value="">select a country</option>
          <option v-for="zone in zones" :key="zone">{{ zone.value }}</option>
        </select>
        <br />
        <span>Your country: {{ country }}</span>
      </div>
      <div class="stand">
        <input type="text" v-model="city" placeholder="enter your city"/>
        <br />
        <span>Your city: {{ city }}</span>
      </div>
      <button @click="selectNewCity" class="stand">Display Weather</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  data() {
    return {
      city: "",
      country: "",
    };
  },
  components: {},
  computed: {
    weather() {
      return this.$store.state.weather;
    },
    zones() {
      return this.$store.state.countries;
    },
  },
  created() {
    this.$store.dispatch("updateWeather");
    this.$store.dispatch("getZones");
  },
  methods: {
    async selectNewCity() {
      const zoneCode = this.$store.state.countries.filter(
        (country) => country.value === this.country
      );
      let exactCode = zoneCode[0].key;

      console.log(exactCode);
      console.log(this.country);
      console.log(this.city);

      const API_KEY = "2bceb88cc80741a895d66a71c9668cf8";
      await axios
        .get(
          `https://api.weatherbit.io/v2.0/current?city=${this.city},${exactCode}&key=${API_KEY}`
        )
        .then((res) => {
          let totalValue = res.data.data[0];
          console.log(res);
          this.$store.commit("NEW_WEATHER", totalValue);
        })
        .catch((err) => console.error(err));
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  box-sizing: border-box;
  text-decoration: none;
  padding: 0px;
  margin: 0px;
  list-style: none;
}

.stand {
  margin: 0.5rem;
  display: inline-flexbox;
}

.blue {
  color: blue;
}

.bold {
  font-weight: 700;
}
</style>
