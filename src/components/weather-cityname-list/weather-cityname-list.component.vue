<template>
  <draggable
    :list="list"
    class="list-group"
    ghost-class="ghost"
    @input="emitter"
    :value="value"
    handle=".handle"
  >
    <div class="col" v-for="item in realValue">
      <div class="location-item">
        <span class="handle btn-drag">
          <span class="line"></span>
          <span class="line"></span>
          <span class="line"></span>
        </span>
        <span class="location-title">{{item | fullLocationName}}</span>
        <span class="btn-delete" @click="deleteLocation(item.cityWeather.id)">
          <img src="~assets/delete.png" alt="Delete">
        </span>
      </div>
    </div>
  </draggable>
</template>

<script>
import draggable from 'vuedraggable';
import mixin from '../../mixin';
import {mapMutations} from 'vuex';

export default {
  name: "app-weather-cityname-list",
  props: {
    value: {
      required: false,
      type: Array,
      default: null
    },
    list: {
      required: false,
      type: Array,
      default: null
    }
  },
  computed: {
    // this.value when input = v-model
    // this.list  when input != v-model
    realValue() {
      return this.value ? this.value : this.list;
    }
  },
  mixins: [mixin],
  methods: {
    ...mapMutations(['deleteLocation']),

    emitter(value) {
      this.$emit("input", value);
    }
  },
  components: {
    draggable
  }
}
</script>

<style lang="scss" scoped>
  @import 'weather-cityname-list.component.scss';
</style>
