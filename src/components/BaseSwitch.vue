<template>
  <div :class="$style.switch__button__control">
    <div
      :class="[$style.switch__button, (isEnabled ? $style.enabled : '')]"
      :style="{'--color': color}"
      @click="toggle"
    >
      <div
        :class="$style.button"
      />
    </div>
    <div
      :class="$style.switch__button__label"
    >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseSwitch',
  model: {
    prop: 'isEnabled',
    event: 'toggle'
  },
  props: {
    isEnabled: {
      type: Boolean,
      required: true
    },
    color: {
      type: String,
      required: false,
      default: '#4D4D4D'
    }
  },
  methods: {
    toggle: function () {
      this.$emit('toggle', !this.isEnabled)
    }
  }
}
</script>

<style lang="scss" module>
// For switch-button styling
.switch__button__control {
  display: flex;
  flex-direction: row;
  align-items: center;
  .switch__button {
    $switch-button-height: 1.6em;
    $switch-button-color: var(--color);
    $switch-button-border-thickness: 2px;
    $switch-transition: all 0.3s ease-in-out;
    $switch-is-rounded: true;
    height: $switch-button-height;
    width: calc(#{$switch-button-height} * 2);
    border: $switch-button-border-thickness solid $switch-button-color;
    box-shadow: inset 0px 0px $switch-button-border-thickness 0px
      rgba(0, 0, 0, 0.33);
    border-radius: if($switch-is-rounded, $switch-button-height, 0);
    transition: $switch-transition;
    $button-side-length: calc(
      #{$switch-button-height} - (2 * #{$switch-button-border-thickness})
    );
    cursor: pointer;
    .button {
      height: $button-side-length;
      width: $button-side-length;
      border: $switch-button-border-thickness solid $switch-button-color;
      border-radius: if($switch-is-rounded, $button-side-length, 0);
      background: $switch-button-color;
      transition: $switch-transition;
    }
    &.enabled {
      background-color: $switch-button-color;
      box-shadow: none;
      .button {
        background: white;
        transform: translateX(
          calc(#{$button-side-length} + (2 *#{$switch-button-border-thickness}))
        );
      }
    }
  }
  .switch__button__label {
    margin-left: 10px;
  }
}
</style>
