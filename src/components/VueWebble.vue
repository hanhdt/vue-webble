<template>
  <div>
    <h1>Vue Webble plugin</h1>
  </div>
</template>

<script>
export default {
  name: 'VueWebble',
  props: {
    // Filter type is one of options
    // all | services | name
    filterType: {
      type: String,
      required: true
    },
    // Should be one of services in https://www.bluetooth.com/specifications/gatt/services
    services: {
      type: Array,
      required: true
    },
    // The device name being advertised with the name filters key
    name: {
      type: String,
      required: false,
      default () {
        return ''
      }
    }
  },
  data() {
    return {
      scannedDevices: [],
      connectedDevices: []
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    requestDevice() {
      // Reset scanned devices
      this.scannedDevices = []

      switch (this.filterType) {
        case 'all':
          navigator.bluetooth.requestDevice({
            acceptAllDevices: true,
            optionalServices: this.services
          })
          .then(device => { 
            this.scannedDevices.push(device)
          })
          .catch(error => { 
            console.log(error)
          })
          break
        case 'services':
          navigator.bluetooth.requestDevice({ 
            filters: [{ 
              services: this.services
            }] 
          })
          .then(device => { 
            this.scannedDevices.push(device)
          })
          .catch(error => { console.log(error) })
        case 'name':
          navigator.bluetooth.requestDevice({
            filters: [{
              name: this.name
            }],
            optionalServices: this.services
          })
          .then(device => { 
            this.scannedDevices.push(device)
          })
          .catch(error => { console.log(error) })
        default:
          break
      }
    },
    connectDevice(device) {
      if (!this.connectedDevices.includes(device)) {
        // TODO: connect the device
      }
    },
    disconnectDevice(device) {
      if (this.connectedDevices.includes(device)) {
        // TODO: disconnect the device
      } else {
        // TODO: disconnect all the devices
      }
    }
  },
  watch: {
    scannedDevices: {
      handler: 'emitScannedDevices',
      deep: true
    },
    connectedDevices: {
      handler: 'emitConnectDevices',
      deep: true
    }
  }
}
</script>

<style lang="scss" module>
</style>
