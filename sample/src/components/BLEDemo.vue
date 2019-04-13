<template>
  <div class="hello">
    <VueWebble
      filter-type="all"
    />
  </div>
</template>

<script>
import VueWebble from '../../../src/components/VueWebble'
export default {
  name: 'BLEDemo',
  components: {
    VueWebble
  },
  data() {
    return {
      services: [
        'device_information'
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
