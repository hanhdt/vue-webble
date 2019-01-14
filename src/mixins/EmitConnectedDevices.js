/**
 *
 * @param {*} component
 */
export default function () {
  return {
    methods: {
      emitConnectDevices(devices) {
        this.$emit('connected-devices', devices)
      }
    }
  }
}
