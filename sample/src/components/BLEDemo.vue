<template>
  <div class="hello container">
    <h1>Vue Webble - Web Bluetooth LE plugin</h1>
    <VueWebble
      filter-type="all"
      :services="this.services"
      @scanned-devices="handleScannedDevices"
      @connected-devices="handleConnectedDevices"
    />
  </div>
</template>

<script>
import VueWebble from '../../../src/components/VueWebble'
export default {
  name: 'BLEDemo',
  components: {
    VueWebble
  },
  data() {
    return {
      services: [
        'alert_notification'
      ]
    }
  },
  methods: {
    handleScannedDevices(devices) {
      console.log('Scanned devices:', devices)
    },
    handleConnectedDevices(devices) {
      console.log('Connected devices:', devices)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
