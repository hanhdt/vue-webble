<template>
  <div>
    <div class="device-item">
      <div class="device__name">Device 1 - 3G</div>
      <div class="device__btn">
        <button class="btn__connect">Connect</button>
      </div>
    </div>
    <div class="device-item">
        <div class="device__name">Device 2 - 4G</div>
        <div class="device__btn">
          <button class="btn__info"><img src="../images/info-ic.svg" alt=""></button>
          <button class="btn__disconnect">Disconnect</button>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'BaseDevice',
}
</script>

<style lang="scss" module>
.btn__disconnect {
    display: inline-block;
    border: none;
    border-radius: 30px;
    padding: 8px 15px;
    margin: 0;
    text-decoration: none;
    background: #0069ed;
    color: #ffffff;
    font-family: sans-serif;
    font-size: 13px;
    cursor: pointer;
    text-align: center;
    transition: background 250ms ease-in-out, 
    transform 150ms ease;
    -webkit-appearance: none;
    -moz-appearance: none;
  }
  
  .btn__disconnect:hover,
  .btn__disconnect:focus {
    background: #0053ba;
  }
  
  .btn__disconnect:focus {
    outline: none;
    outline-offset: 0;
  }
  
  .btn__disconnect:active {
    transform: scale(0.99);
  }
</style>
