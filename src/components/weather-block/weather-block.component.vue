<template>
  <div class="container">
    <app-weather-settings @toggleSettings="toggleSettingsHandler($event)"/>
    <div class="row" v-if="!isLoading && isWeatherShowed">
      <div class="col">
        <div class="weather-list" v-if="selectedLocations.length > 0">
          <app-weather v-for="location in selectedLocations" :location="location" :key="location.cityWeather.id"/>
        </div>
        <div v-else>
          <span class="no-select-location">Select location</span>
        </div>
      </div>
    </div>
    <div v-else-if="isLoading && isWeatherShowed">
      <span class="no-select-location">Loading...</span>
    </div>
  </div>
</template>

<script>
import AppWeatherSettings from '../weather-settings/weather-settings.component';
import AppWeather from '../weather/weather.component';
import {mapGetters, mapActions} from 'vuex';

const timeout = 30 * 60 * 1000; // 30 minutes

export default {
  name: 'app-weather-block',
  data() {
    return {
      isLoading: true,
      timer: '',
      isWeatherShowed: true
    }
  },
  created() {
    this.setLocationData();
    this.timer = setInterval(this.setLocationData, timeout);
  },
  mounted() {
    this.isLoading = false;
  },
  components: {
    AppWeatherSettings,
    AppWeather
  },
  computed: mapGetters(['selectedLocations']),
  methods: {
    ...mapActions(['setDefaultLocation', 'actualizeLocations']),

    setLocationData() {
      if (this.selectedLocations.length === 0) {
        this.setDefaultLocation();
      } else {
        this.actualizeLocations();
      }
    },

    toggleSettingsHandler(isOpened) {
      this.isWeatherShowed = !isOpened;
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
}
</script>

<style lang="scss" scoped>
  .no-select-location {
    font-size: 14px;
    color: #ccc;
    line-height: 32px;
  }
</style>
