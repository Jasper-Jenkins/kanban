<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
import router from "./router";
export default {
  name: 'App',
  mounted(){
    if(!this.$store.state.user._id){
      router.push({ name: "Login" });
    }else{
      this.$store.dispatch("authenticate")
    }
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
