<script>
const IMG_URL = `http://openweathermap.org/img/wn`;
export default {
  methods: {
    async getLocationInfo(params) {
      const {locationId, latitude = false, longitude = false} = params;
      //get main info
      const paramsToUrl = locationId > 0 ? {id: locationId} : {lat: latitude, lon: longitude};
      const response = await this.$api.get(`/weather`, {params: paramsToUrl});

      const result = response.data;
      const cityWeather = result;
      const icon = `${IMG_URL}/${result.weather[0].icon}@2x.png`;

      //get add info
      const {lon, lat} = result.coord;
      const additional = await this.$api.get(`/onecall`, {params: {lat, lon}});
      const dewPoint = additional.data.current.dew_point;
      const location = {
        cityWeather,
        icon,
        dewPoint
      };
      return location;
    },
  },
  filters: {
    fullLocationName: (location) => {
      let fullName = location.cityWeather.name;
      fullName = location.cityWeather.sys.country ? `${fullName}, ${location.cityWeather.sys.country}` : fullName;
      return fullName;
    }
  }
}
</script>
