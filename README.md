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

## Binding events
