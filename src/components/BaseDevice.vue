<template>
  <div :class="$style['device__list']">
    <div :class="$style['device__item']">
      <div :class="$style['device__name']">
        Device 1 - 3G
      </div>
      <div :class="$style['device__btn']">
        <button :class="$style['btn__info']">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 50 50" height="25px" id="Layer_1" version="1.1" viewBox="0 0 50 50" width="25px" xml:space="preserve">
            <circle cx="25" cy="25" fill="none" r="24" stroke="#000000" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"/><rect fill="none" height="50" width="50"/>
            <path d="M23.779,16.241c-0.216,0-0.357-0.144-0.357-0.359v-2.618c0-0.215,0.142-0.359,0.357-0.359h2.439  c0.215,0,0.359,0.144,0.359,0.359v2.618c0,0.215-0.145,0.359-0.359,0.359H23.779z M23.852,37.293c-0.215,0-0.358-0.143-0.358-0.358  V20.473c0-0.215,0.144-0.359,0.358-0.359h2.295c0.216,0,0.359,0.144,0.359,0.359v16.462c0,0.216-0.144,0.358-0.359,0.358H23.852z"/>
          </svg>
        </button>
        <button :class="$style.btn__disconnect">
          Connect
        </button>
      </div>
    </div>
    <div :class="$style['device__item']">
      <div :class="$style['device__name']">
        Device 2 - 4G
      </div>
      <div :class="$style['device__btn']">
        <button :class="$style.btn__connect">
          Disconnect
        </button>
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
.device__list {
  display: flex;
  flex-flow: column wrap;
}
.device__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  margin-bottom: 10px;
}
.device__btn {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.device__name {
  font-weight: 600;
}
.btn__connect,
.btn__disconnect {
  display: inline-block;
  border: none;
  border-radius: 30px;
  padding: 8px 15px;
  margin: 0;
  text-decoration: none;
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
.btn__connect {
  background: #51ADED;
}
.btn__disconnect {
  background: #ED5153;
}
.btn__connect:hover,
.btn__connect:focus {
  background: #2D9FEE;
}
.btn__disconnect:hover,
.btn__disconnect:focus {
  background: #E14043;
}
.btn__connect:focus,
.btn__disconnect:focus {
  outline: none;
  outline-offset: 0;
}
.btn__connect:active,
.btn__disconnect:active {
  transform: scale(0.99);
}
.btn__info {
  display: inline-block;
  height: 25px;
  width: 25px;
  border: none;
  border-radius: 100%;
  padding: 0;
  margin: 0 15px 0 0;
  text-decoration: none;
  color: #ffffff;
  font-family: sans-serif;
  font-size: 13px;
  cursor: pointer;
  text-align: center;
  background: transparent;
  transition: background 250ms ease-in-out, 
  transform 150ms ease;
  -webkit-appearance: none;
  -moz-appearance: none;
  &:hover {
    svg {
      fill: #555;
      circle {
        stroke: #555;
      }
    }
  }
  svg {
    fill: #999;
    circle {
      stroke: #999;
    }
  }
  &:hover,
  &:focus {
    background: transparent;
  }
  &:focus {
    outline: none;
    outline-offset: 0;
  }
  &:active {
    transform: scale(0.99);
  }
}
</style>
