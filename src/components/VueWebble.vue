<template>
  <div>
    <h1>Vue Webble plugin</h1>
    <div class="webble__header">
      <div class="webble__header--left">
        <h2>Connected devices</h2>
        <div>You have to be connect to the device to play with it</div>
      </div>
      <div class="webble__header--right">
        <switch-button v-model="switch1">
          Lorem ipsum dolor sit amet
        </switch-button>
      </div>
    </div>
    <div class="webble__content">
      <div class="webble__content__connected">
        <h2>Connected devices</h2>
        <BaseDevice />
      </div>
      <div class="webble__content__available">
        <h2>Available devices</h2>
        <BaseDevice />
      </div>
    </div>
    <button id="show-modal" @click="showModal = true">Show Modal</button>
    <!-- use the modal component, pass in the prop -->
    <modal v-if="showModal" @close="showModal = false">
      <!--
        you can use custom content here to overwrite
        default content
      -->
      <h3 slot="header">custom header</h3>
    </modal>
  </div>
</template>

<script>
import Vue from 'vue'
import BaseSwitch from './BaseSwitch.vue'
import BaseDevice from './BaseDevice.vue'
import DeviceModal from './DeviceModal.vue'
export default {
  name: 'VueWebble',
  components: {
    'switch-button': BaseSwitch,
    'modal': DeviceModal,
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
      connectedDevices: [],
      switch1: true,
      showModal: false
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
