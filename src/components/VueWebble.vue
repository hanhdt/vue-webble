<template>
  <!-- :class="$style['class']" -->
  <div :class="$style['webble__container']">
    <h1>Vue Webble plugin</h1>
    <div :class="$style['webble__header']">
      <div :class="$style['webble__header--left']">
        <h2>Bluetooth devices</h2>
        <div>You have to be connect to the device to play with it</div>
      </div>
      <div :class="$style['webble__header--right']">
        <base-switch v-model="switch1">
          Lorem ipsum dolor sit amet
        </base-switch>
      </div>
    </div>
    <div class="webble__content">
      <div :class="$style['webble__content__connected']">
        <h2>Connected devices</h2>
        <base-device />
      </div>
      <div :class="$style['webble__content__available']">
        <h2>Available devices</h2>
        <base-device />
      </div>
    </div>
    <button
      id="show-modal"
      @click="showModal = true"
    >
      Show Modal
    </button>
    <!-- use the modal component, pass in the prop -->
    <base-modal
      v-if="showModal"
      @close="showModal = false"
    >
      <h3
        slot="header"
        :class="$style['device__info__header']"
      >
        Device Info
      </h3>
      <div
        slot="body"
        :class="$style['device__info']"
      >
        <div :class="$style['device__info__item']">
          <div :class="$style['device__info--left']">
            SSID
          </div>
          <div :class="$style['device__info--right']">
            Device-BBB-19c2
          </div>
        </div>
        <div :class="$style['device__info__item']">
          <div :class="$style['device__info--left']">
            Protocol
          </div>
          <div :class="$style['device__info--right']">
            Device-BBB-19c2
          </div>
        </div>
        <div :class="$style['device__info__item']">
          <div :class="$style['device__info--left']">
            Security type
          </div>
          <div :class="$style['device__info--right']">
            Device-BBB-19c2
          </div>
        </div>
        <div :class="$style['device__info__item']">
          <div :class="$style['device__info--left']">
            IP assignment
          </div>
          <div :class="$style['device__info--right']">
            Device-BBB-19c2
          </div>
        </div>
        <div :class="$style['device__info__item']">
          <div :class="$style['device__info--left']">
            Network band
          </div>
          <div :class="$style['device__info--right']">
            Device-BBB-19c2
          </div>
        </div>
        <div :class="$style['device__info__item']">
          <div :class="$style['device__info--left']">
            Network chanel
          </div>
          <div :class="$style['device__info--right']">
            9
          </div>
        </div>
        <div :class="$style['device__info__item']">
          <div :class="$style['device__info--left']">
            Ip4 address
          </div>
          <div :class="$style['device__info--right']">
            192.168.1.1
          </div>
        </div>
      </div>
    </base-modal>
  </div>
</template>

<script>
import BaseSwitch from './BaseSwitch.vue'
import BaseDevice from './BaseDevice.vue'
import BaseModal from './BaseModal.vue'
export default {
  name: 'VueWebble',
  components: {
    BaseSwitch,
    BaseModal,
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
.device__info__header {
  font-size: 16px;
  color: #333;
  font-weight: normal;
  margin-bottom: 60px;
}
.device__info {
  display: flex;
  flex-flow: column wrap;
  .device__info__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
    .device__info--left {
      font-size: 13px;
    }
    .device__info--right {
      font-size: 13px;
      color: #51ADED;
    }
  }
}
</style>
