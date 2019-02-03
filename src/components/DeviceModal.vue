<template id="modal-template">
  <transition name="modal">
    <div :class="$style['modal-mask']">
      <div :class="$style['modal-wrapper']">
        <div :class="$style['modal-container']">

          <div :class="$style['modal-header']">
            <slot name="header">
              Custom Header
            </slot>
          </div>

          <div :class="$style['modal-body']">
            <slot name="body">
              Custom Body
            </slot>
          </div>

          <div :class="$style['modal-footer']">
            <slot name="footer">
              <button :class="$style['modal-default-button']" @click="$emit('close')">
                Cancle
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'DeviceModal',
}
</script>

<style lang="scss" module>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #555;
  font-size: 20px;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  display: inline-block;
  border: none;
  border-radius: 30px;
  padding: 8px 15px;
  margin: 0;
  text-decoration: none;
  color: #555;
  font-family: sans-serif;
  font-size: 13px;
  cursor: pointer;
  text-align: center;
  transition: background 250ms ease-in-out, 
  transform 150ms ease;
  -webkit-appearance: none;
  -moz-appearance: none;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
