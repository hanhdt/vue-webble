<template>
  <div id="app">
    <BLEDemo />
  </div>
</template>

<script>
import BLEDemo from './components/BLEDemo.vue'

export default {
  name: 'App',
  components: {
    BLEDemo
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
