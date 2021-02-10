<template>
    <div class="weather-settings" :class="{opened : isOpened}">
      <div class="btn-settings" title="Show settings" v-if="!isOpened" @click="toggleSettings()">
        <img src="~assets/settings.png" alt="Settings">
      </div>
      <div v-else>
        <div class="btn-close" @click="toggleSettings()">&times;</div>
        <div class="title">Settings</div>
        <div class="row">
          <app-weather-cityname-list v-model="locations" />
        </div>
        <div class="row">
          <div class="col">
            <form @submit.prevent="onSearch()" class="search-form">
              <label>Add Location:</label>
              <input v-model="location"/>
              <button class="btn-search" type="submit"></button>
              <div class="search-results" v-if="findedLocations.length > 0">
                <div v-for="location in findedLocations">
                  <div class="variant" @click="selectCity(location.id)">
                    {{location.name}}, {{location.country}}
                  </div>
                </div>
              </div>
              <div class="search-results" v-if="noResults">
                Not results
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import {mapGetters, mapActions, mapMutations} from 'vuex';
import AppWeatherCitynameList from '../weather-cityname-list/weather-cityname-list.component';
import mixin from '../../mixin';

export default {
  name: 'app-weather-settings',
  data() {
    return {
      location: null,
      findedLocations: [],
      isOpened: false,
      selectLocation: null,
      noResults: false
    }
  },
  computed: {
    ...mapGetters(['selectedLocations']),
    locations: {
      get() {
        return this.selectedLocations;
      },
      set(value) {
        this.updateLocations(value);
      }
    }
  },
  mixins: [mixin],
  methods: {
    ...mapActions(['setLocation']),
    ...mapMutations(['updateLocations']),

    toggleSettings() {
      this.isOpened = !this.isOpened;
      this.$emit('toggleSettings', this.isOpened);
    },
    async onSearch() {
      if (this.location && this.location.length > 0) {
        try {
          const response = await this.$api.get(`/find`, {params: {q: this.location}});
          const locations = response.data;
          this.findedLocations = locations && locations.list ? locations.list.map((item) => {
            const {id, name, sys: {country}} = item;
            return {id, name, country};
          }) : [];

          this.noResults = this.findedLocations.length === 0;
        } catch (e) {
          console.error(e);
          this.noResults = true;
        }
      }
    },
    async selectCity(locationId) {
      if (locationId) {
        this.location = null;
        this.findedLocations = [];
        const locationInfo = await this.getLocationInfo({locationId});
        this.setLocation(locationInfo);
      }
    }
  },
  watch: {
    location: function() {
      this.noResults = false;
    }
  },
  components: {
    AppWeatherCitynameList
  }
}
</script>

<style lang="scss" scoped>
@import './weather-settings.component';
</style>
