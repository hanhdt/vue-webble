<template>
  <div :class="$style.webble__container">
    <h1>Vue Webble plugin</h1>
    <div :class="$style.webble__header">
      <div :class="$style['webble__header--left']">
        <h2>Bluetooth devices</h2>
        <div>You have to be connect to the device to play with it</div>
      </div>
      <div :class="$style['webble__header--right']">
        <base-switch
          v-model="scanStatus"
          :color="switchColor"
        />
      </div>
    </div>
    <div class="webble__content">
      <div :class="$style['webble__content__connected']">
        <h2>Connected devices</h2>
        <base-device :is-connected="true" />
      </div>
      <div :class="$style['webble__content__available']">
        <h2>Available devices</h2>
        <base-device :is-connected="false" />
      </div>
    </div>
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
      required: false,
      default () {
        return ''
      }
    },
    // Should be one of services in https://www.bluetooth.com/specifications/gatt/services
    services: {
      type: Array,
      required: false,
      default () {
        return []
      }
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
      connectedDevices: [],
      scanStatus: false,
      switchColor: '#2D9FEE'
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
.webble__container {
  max-width: 640px;
  margin-right: auto;
  margin-left: auto;
  padding-left: 15px;
  padding-right: 15px;
}
.webble__header {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 60px;
  &--left {
    h2 {
      text-align: left;
      margin-bottom: 10px;
    }
  }
}
.webble__content__connected,
.webble__content__available {
  h2 {
    text-align: left;
    font-size: 16px;
    font-weight: normal;
    color: #777;
  }
}
.webble__content__connected {
  margin-bottom: 60px;
}
</style>
