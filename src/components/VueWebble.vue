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
      required: true,
      default () {
        return 'all' // name | services
      }
    },
    // Should be one of services in https://www.bluetooth.com/specifications/gatt/services
    services: {
      type: Array,
      required: true
    },
    // The device name being advertised with the name filters key,
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
  mounted() {
  },
  methods: {
    requestDevice() {
    },
    connectDevice() {
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
