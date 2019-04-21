/**
 * Expose scanned devices
 * @param {*} component
 */
export default function () {
  return {
    methods: {
      emitScannedDevices(devices) {
        this.$emit('scanned-devices', devices)
      }
    }
  }
}
