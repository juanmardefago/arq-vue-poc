<template>
  <div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Home',
  data () {
    return {
      accommodations: []
    }
  },
  mounted () {
    axios
      .get()
  }
}
</script>

<style scoped>

</style>
