<template>
  <div id="weather-block" class="ml-auto mr-auto ml-sm-0 mr-sm-0">
    <app-weather-block />
  </div>
</template>

<script>
import AppWeatherBlock from '../weather-block/weather-block.component';

export default {
  name: 'app',
  components: {
    AppWeatherBlock
  }
}
</script>

<style lang="scss">
@import '~bootstrap/scss/bootstrap.scss';
</style>
<style lang="scss" scoped>
@import 'app';
</style>
