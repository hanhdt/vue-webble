<template>
  <div :class="$style.modal__wrapper">
    <div :class="$style.modal__mask" @click="$emit('close')">
    </div>
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
            :class="$style.modal__button"
            @click="$emit('close')"
          >
            Cancel
          </button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeviceModal',
}
</script>

<style lang="scss" module>
.modal__wrapper {
  position: fixed;
  z-index: 9995;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity .3s ease;
  .modal__mask {
    position: fixed;
    z-index: 9996;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity .3s ease;
  }
  .modal__container {
    position: relative;
    z-index: 9997;
    width: 300px;
    margin-top: -15%;
    padding: 30px;
    background-color: #fff;
    border-radius: 3px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }
  .modal__header {
    padding-bottom: 30px;
    h3 {
      margin-top: 0;
      margin-bottom: 0;
      font-size: 20px;
      font-weight: normal;
      color: #333;
    }
  }
  .modal__body {
    padding-bottom: 30px;
  }
  .modal__button {
    display: inline-block;
    border: 1px solid #ddd;
    border-radius: 30px;
    padding: 8px 15px;
    margin: 0;
    text-decoration: none;
    color: #555;
    font-family: sans-serif;
    font-size: 13px;
    cursor: pointer;
    text-align: center;
    background-color: transparent;
    transition: background-color 250ms ease-in-out, 
    transform 150ms ease;
    -webkit-appearance: none;
    -moz-appearance: none;
    &:focus {
      outline: none;
      outline-offset: 0;
    }
    &:active {
      transform: scale(0.95);
    }
    &:hover, &:focus {
      background-color: #f3f3f3
    }
  }
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
