<template>
  <div class="weather" v-if="cityWeather">
    <div class="row info-row">
      <div class="col">
        <div class="city">{{location | fullLocationName}}</div>
      </div>
    </div>
    <div class="row info-row" v-if="cityWeather.main.temp">
      <div class="col">
        <div class="temperature">
          <img :src="icon" alt="Weather"/>
          {{cityWeather.main.temp | round}} <sup>o</sup>C
        </div>
      </div>
    </div>
    <div class="row info-row">
      <div class="col">
        <div class="description">
          <span v-if="cityWeather.main.feels_like">Feels like {{cityWeather.main.feels_like | round}}.</span>
          <span v-if="cityWeather.weather[0].description">{{cityWeather.weather[0].description | uppercase}}.</span>
        </div>
      </div>
    </div>
    <div class="row info-row">
      <div class="col" v-if="cityWeather.wind.speed">
        <div class="wind">
          <svg v-if="cityWeather.wind.deg" viewBox="0 0 1000 1000"
               enable-background="new 0 0 1000 1000"
               xml:space="preserve"
               class="icon icon-wind-direction"
               :style="`transform: rotate(${cityWeather.wind.deg}deg)`">
            <g fill="#48484a">
              <path d="M510.5,749.6c-14.9-9.9-38.1-9.9-53.1,1.7l-262,207.3c-14.9,11.6-21.6,6.6-14.9-11.6L474,48.1c5-16.6,14.9-18.2,21.6,0l325,898.7c6.6,16.6-1.7,23.2-14.9,11.6L510.5,749.6z"></path>
              <path d="M817.2,990c-8.3,0-16.6-3.3-26.5-9.9L497.2,769.5c-5-3.3-18.2-3.3-23.2,0L210.3,976.7c-19.9,16.6-41.5,14.9-51.4,0c-6.6-9.9-8.3-21.6-3.3-38.1L449.1,39.8C459,13.3,477.3,10,483.9,10c6.6,0,24.9,3.3,34.8,29.8l325,898.7c5,14.9,5,28.2-1.7,38.1C837.1,985,827.2,990,817.2,990z M485.6,716.4c14.9,0,28.2,5,39.8,11.6l255.4,182.4L485.6,92.9l-267,814.2l223.9-177.4C454.1,721.4,469,716.4,485.6,716.4z"></path>
            </g>
          </svg>
          {{cityWeather.wind.speed | roundToTen}}m/s {{cityWeather.wind.deg | windDirection}}
        </div>
      </div>
      <div class="col" v-if="cityWeather.main.pressure">
        <div class="pressure">
          <svg width="96pt" height="96pt" viewBox="0 0 96 96" class="icon-pressure">
            <g transform="translate(0,96) scale(0.100000,-0.100000)" fill="#48484a" stroke="none">
            <path d="M351 854 c-98 -35 -179 -108 -227 -202 -27 -53 -29 -65 -29 -172 0
    -107 2 -119 29 -172 38 -75 104 -141 180 -181 58 -31 66 -32 176 -32 110 0
    118 1 175 32 77 40 138 101 178 178 31 57 32 65 32 175 0 110 -1 118 -32 176
    -40 76 -106 142 -181 179 -49 25 -71 29 -157 32 -73 2 -112 -1 -144 -13z m259
    -80 c73 -34 126 -86 161 -159 24 -50 29 -73 29 -135 0 -62 -5 -85 -29 -135
    -57 -119 -161 -185 -291 -185 -130 0 -234 66 -291 185 -24 50 -29 73 -29 135
    0 130 66 234 185 291 82 40 184 41 265 3z"></path>
            <path d="M545 600 c-35 -35 -68 -60 -80 -60 -27 0 -45 -18 -45 -45 0 -33 -50
    -75 -89 -75 -18 0 -41 -5 -53 -11 -20 -11 -20 -11 3 -35 12 -13 33 -24 46 -24
    17 0 23 -6 23 -23 0 -13 10 -33 23 -45 30 -28 47 -13 47 43 0 32 6 47 28 68
    15 15 37 27 48 27 26 0 44 18 44 44 0 12 26 47 60 81 l60 61 -28 27 -28 27
    -59 -60z"></path>
            </g>
          </svg>
          {{cityWeather.main.pressure}}hPa
        </div>
      </div>
    </div>
    <div class="row info-row">
      <div class="col" v-if="cityWeather">
        <div class="humiditi">
          Humiditi: {{cityWeather.main.humidity}} %
        </div>
      </div>
      <div class="col" v-if="dewPoint">
        <div class="dew-point">
          Dew point: {{dewPoint | round}} <sup>o</sup>C
        </div>
      </div>
    </div>
    <div class="row info-row" v-if="cityWeather.visibility">
      <div class="col">
        <div class="visibility">
          Visibility: {{cityWeather.visibility | toKm}}km
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from '../../mixin.vue';

const compassSector = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N"];
const SECTOR_DEL = 22.5;
const METR_IN_KM = 1000;

export default {
  name: 'app-weather',
  data() {
    return {
      cityWeather: null,
      dewPoint:  null,
      icon:  null
    }
  },
  props: {
    location: {
      type: Object,
      required: true
    }
  },
  mixins: [mixin],
  created() {
    this.setWeatherData();
  },
  beforeUpdate() {
    this.setWeatherData();
  },
  methods: {
    setWeatherData() {
      if (this.location) {
        this.cityWeather = this.location.cityWeather;
        this.dewPoint = this.location.dewPoint;
        this.icon = this.location.icon;
      }
    }
  },
  filters: {
    uppercase: (v) => v ? v[0].toUpperCase() + v.slice(1) : ``,
    round: (v) => Math.round(v),
    roundToTen: (v) => v.toFixed(1),
    windDirection: (v) => compassSector[(v / SECTOR_DEL).toFixed(0)],
    toKm: (v) => (v / METR_IN_KM).toFixed(1)
  }
}
</script>

<style lang="scss" scoped>
  @import './weather.component';
</style>
