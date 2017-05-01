<template>
  <div class="widthHeight100">
    <background></background>
    <router-view class="widthHeight100" style="position: fixed; top: 0;"></router-view>
  </div>
</template>

<script>
  import Background from './components/Background';

  export default {
    name: 'Index',
    data(){
      return {
        activeName: 'first',
      }
    },
    methods: {

    },
    components: {
      Background
    },
    mounted() {
      // this.init();
    }
  }
</script>

<style>

</style>
