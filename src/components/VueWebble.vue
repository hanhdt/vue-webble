<template>
  <div :class="$style.webble__container">
    <div :class="$style.webble__header">
      <div :class="$style['webble__header--left']">
        <h2>Bluetooth LE devices</h2>
        <div>You have to be connect to the device before play with it.</div>
      </div>
      <div :class="$style['webble__header--right']">
        <base-switch
          v-model="scanStatus"
          :is-enabled="scanStatus"
          :color="switchColor"
        />
      </div>
    </div>
    <div :class="$style.webble__content">
      <!-- Connected BLE devices -->
      <div :class="$style['webble__content__connected']">
        <h2>Connected devices:</h2>
        <div
          :class="$style.device__list"
          v-if="this.connectedDevices.length > 0"
        >
          <base-device
            v-for="connectedDevice in this.connectedDevices"
            :key="connectedDevice.id"
            :device="connectedDevice"
            @disconnect-device="disconnectDevice"
          />
        </div>
        <div
          :class="$style.device__list"
          v-else
        >
          <span>No devices</span>
        </div>
      </div>
      <!-- Avaiable BLE devices -->
      <div :class="$style['webble__content__available']">
        <h2>Available devices:</h2>
        <div
          :class="$style.device__list"
          v-if="this.scannedDevices.length > 0"
        >
          <base-device
            v-for="scannedDevice in this.scannedDevices"
            :key="scannedDevice.id"
            :device="scannedDevice"
            @connect-device="connectDevice"
          />
        </div>
        <div
          :class="$style.device__list"
          v-else
        >
          <span>No devices</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EmitConnectedDevices from '../mixins/EmitConnectedDevices.js'
import EmitScannedDevices from '../mixins/EmitScannedDevices.js'
import BaseSwitch from './BaseSwitch.vue'
import BaseDevice from './BaseDevice.vue'

export default {
  name: 'VueWebble',
  mixins: [
    EmitScannedDevices(),
    EmitConnectedDevices()
  ],
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
    deviceName: {
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
  methods: {
    handleRequestScanning(statusVal) {
      if (statusVal) {
        console.log('> Start scanning...')
        this.requestDevice()
      } else {
        console.log('> Turned off Bluetooth BLE')
        this.scannedDevices = []
        for (let deviceIndex = 0; deviceIndex < this.connectedDevices.length; deviceIndex++) {
          const device = this.connectedDevices[deviceIndex]
          device.gatt.disconnect()
        }
        this.connectedDevices = []
      }
    },
    handleScannedDevicesChange(devices) {
      this.emitScannedDevices(devices)
    },
    handleConnectedDevicesChange(devices) {
      this.emitConnectedDevices(devices)
    },
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
            console.error(error.message)
            this.scanStatus = false
            this.scannedDevices = []
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
            console.error(error.message)
            this.scanStatus = false
            this.scannedDevices = []
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
            console.error(error)
            this.scanStatus = false
            this.scannedDevices = []
          }
          break
        default:
          this.scanStatus = false
          this.scannedDevices = []
          break
      }
    },
    async connectDevice(device) {
      // Connect the device
      const server = await device.gatt.connect()
      // console.log('Connected device:', device.gatt)

      if (this.scannedDevices.includes(device) && !this.connectedDevices.includes(device)) {
        this.scannedDevices.splice(this.scannedDevices.indexOf(device), 1)
        this.connectedDevices.push(device)
      }
      return server
    },
    async disconnectDevice(device) {
      if (this.connectedDevices.includes(device)
        && device.gatt.connected) {
        // Disconnect the device
        const disconnect = await device.gatt.disconnect()
        this.connectedDevices.splice(this.connectedDevices.indexOf(device), 1)
        // console.log('Disconnected device:', device.gatt)

        if (!this.scannedDevices.includes(device)) {
          this.scannedDevices.push(device)
        }
      } else {
        console.log('> Bluetooth device is already disconnected.');
      }
    }
  },
  watch: {
    scannedDevices: {
      handler: 'handleScannedDevicesChange',
      deep: true
    },
    connectedDevices: {
      handler: 'handleConnectedDevicesChange',
      deep: true
    },
    scanStatus: {
      handler: 'handleRequestScanning'
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
  .webble__content {
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
      .device__list {
        display: flex;
        flex-flow: column wrap;
        span {
          text-align: start;
        }
      }
    }
  }
}
</style>
