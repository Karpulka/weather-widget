export default {
  addLocation(state, locationObj) {
    const index = state.locations.findIndex((location) => location.cityWeather.id === locationObj.cityWeather.id);
    if (index === -1) {
      state.locations.push(locationObj);
    }
  },
  deleteLocation(state, locationId) {
    const index = state.locations.findIndex((location) => location.cityWeather.id === locationId);
    if (index === -1) {
      return;
    }

    state.locations = [].concat(state.locations.slice(0, index), state.locations.slice(index + 1));
  },
  updateLocations(state, locations) {
    state.locations = locations;
  }
}
