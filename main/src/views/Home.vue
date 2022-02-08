<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" v-for="i in 20" :key="i">
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home'
}
</script>
