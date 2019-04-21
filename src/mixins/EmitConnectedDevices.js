/**
 * Emit connected devices
 * @param {*} component
 */
export default function () {
  return {
    methods: {
      emitConnectedDevices(devices) {
        this.$emit('connected-devices', devices)
      }
    }
  }
}
