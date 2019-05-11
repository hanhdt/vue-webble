# vue-webble

Web Bluetooth LE UI plugin for Vue.js

## [Demo page](/sample)

![vue webble no devices](/sample/src/assets/webble-no-devices.png)

![vue webble list](/sample/src/assets/webble-devices-list.png)

![vue webble connected list](/sample/src/assets/webble-device-info.png)

## Features

- Manage Web Bluetooth LE devices reactively
- Simple, clean and responsive UI component can be integrated to Web app

## Installation

For NPM

```Shell
  $npm install --save vue-webble
```

Or from YARN

```Shell
  $yarn add vue-webble
```

## Mount Component

in your component, import the package as a child component.

```Javascript
import VueWebble from "vue-webble";

export default {
  // ...
  components: {
    VueWebble
  }
};
```

## Component Usages

Add VueWebble into your single component file

```Javascript
<template>
  <!-- ... -->
  <VueWebble
    filter-type="all"
    :services="[
      'alert_notification'
    ]"
    @scanned-devices="handleScannedDevices"
    @connected-devices="handleConnectedDevices"
  />
  <!-- ... -->
</template>
```

## Binding events

The `<VueWebble/>` element emits several events which you can use to observe and respond to changes in component state.

- `@scanned-devices` is fired when BLE scanning is enabled and user accepts to pair to the particular device.
- `@connected-devices` is fired when one device is connected from scanned devices list.

## Contributing

If you're interested in contributing to Vue-Webble or share your opinions, please consider to submitting a [**pull request**](https://github.com/hanhdt/vue-webble/pulls) or post [**issues**](https://github.com/hanhdt/vue-webble/issues).
