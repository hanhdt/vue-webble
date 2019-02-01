<template>
  <div>
    <h1>Vue Webble plugin</h1>
    <BaseSwitch />
    <h2>Connected devices</h2>
    <BaseDevice />
    <h2>Available devices</h2>
    <BaseDevice />
  </div>
</template>

<script>
import BaseSwitch from './BaseSwitch.vue'
import BaseDevice from './BaseDevice.vue'
export default {
  name: 'VueWebble',
  components: {
    BaseSwitch,
    BaseDevice
  },
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
    // Scan devices
    async requestDevice() {
      // Reset scanned devices
      this.scannedDevices = []

      switch (this.filterType) {
        case 'all':
          try {
            const device = await navigator.bluetooth.requestDevice({
              acceptAllDevices: true,
              optionalServices: this.services
            })
            this.scannedDevices.push(device)
          } catch(error) { 
            console.log(error)
          }
          break
        case 'services':
          try {
            const device = await navigator.bluetooth.requestDevice({
              filters: [{ 
                services: this.services
              }]
            })
            this.scannedDevices.push(device)
          } catch(error) {
            console.log(error)
          }
          break
        case 'name':
          try {
            const device = await navigator.bluetooth.requestDevice({
              filters: [{ 
                name: this.name
              }]
            })
            this.scannedDevices.push(device)
          } catch(error) {
            console.log(error)
          }
          break
        default:
          break
      }
    },
    async connectDevice(device) {
      if (!this.connectedDevices.includes(device)) {
        this.connectedDevices.push(device)
      }
      // Connect the device
      const server = await device.gatt.connect()
      return server
    },
    async disconnectDevice(device) {
      if (this.connectedDevices.includes(device)
        && device.gatt.connected) {
        // Disconnect the device
        await device.gatt.disconnect()
        this.connectedDevices.splice(this.connectedDevices.indexOf(device), 1)
      } else {
        console.log('> Bluetooth Device is already disconnected');
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
@import url('../design/index.scss');
</style>
