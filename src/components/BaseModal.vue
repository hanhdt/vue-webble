<template>
  <transition name="modal">
    <div :class="$style.modal__mask">
      <div :class="$style.modal__wrapper">
        <div :class="$style.modal__container">
          <div :class="$style.modal__header">
            <h3
              :class="$style.device__info__header"
            >
              Device details
            </h3>
          </div>

          <div :class="$style.modal__body">
            <div
              :class="$style.device__info"
            >
              <div :class="$style.device__info__item">
                <div :class="$style.device__info__left">
                  SSID
                </div>
                <div :class="$style.device__info__right">
                  Device-BBB-19c2
                </div>
              </div>
              <div :class="$style.device__info__item">
                <div :class="$style.device__info__left">
                  Protocol
                </div>
                <div :class="$style.device__info__right">
                  Device-BBB-19c2
                </div>
              </div>
              <div :class="$style.device__info__item">
                <div :class="$style.device__info__left">
                  Security type
                </div>
                <div :class="$style.device__info__right">
                  Device-BBB-19c2
                </div>
              </div>
              <div :class="$style.device__info__item">
                <div :class="$style.device__info__left">
                  IP assignment
                </div>
                <div :class="$style.device__info__right">
                  Device-BBB-19c2
                </div>
              </div>
              <div :class="$style.device__info__item">
                <div :class="$style.device__info__left">
                  Network band
                </div>
                <div :class="$style.device__info__right">
                  Device-BBB-19c2
                </div>
              </div>
            </div>
          </div>

          <div :class="$style.modal__footer">
            <slot name="footer">
              <button 
                :class="$style.modal__default__button"
                @click="$emit('close')"
              >
                Cancel
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
.modal__mask {
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

.modal__wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal__container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal__header h3 {
  margin-top: 0;
  color: #555;
  font-size: 20px;
}

.modal__body {
  margin: 20px 0;
}

.modal__default__button {
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
    .device__info__left {
      font-size: 13px;
    }
    .device__info__right {
      font-size: 13px;
      color: #51ADED;
    }
  }
}
</style>
