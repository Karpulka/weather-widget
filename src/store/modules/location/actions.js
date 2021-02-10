import mixin from '../../../mixin';

export default {
  async setDefaultLocation(ctx) {
     await navigator.geolocation.getCurrentPosition((position) => {
      const {coords: {latitude, longitude}} = position;
      mixin.methods.getLocationInfo
        .call(this, {locationId: false, latitude, longitude})
        .then((locationInfo) => {
          if (locationInfo) {
            ctx.dispatch('setLocation', locationInfo);
          }
        });
    });
  },

  async setLocation(ctx, locationInfo) {
    try {
      ctx.commit('addLocation', locationInfo);
    } catch (err) {
      console.error(err)
    };
  },

  async actualizeLocations(ctx) {
    const promises = Object.values(ctx.getters.selectedLocations).map(async (location) => {
      return await mixin.methods.getLocationInfo.call(this,{locationId: location.cityWeather.id});
    });
    const locations = await Promise.all(promises);
    ctx.commit('updateLocations', locations);
  }
}
