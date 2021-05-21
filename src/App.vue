<template>
<!--  <div id="app">-->
<!--    <img alt="Vue logo" src="./assets/logo.png">-->
<!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
<!--  </div>-->

<!--  <store/>-->
  <router-view/>
</template>

<script>
// with the router configured the store component and instance are commented out
// import HelloWorld from './components/HelloWorld.vue'
// import Store from "./components/Store";
import { mapActions } from "vuex";


export default {
  // component that needs to be presented to the users should be reference here.
  name: 'App',
  components: {
    // Store,

    // HelloWorld
  },
// the method below is used to get the stored restful data
  methods: {
    ...mapActions(["getData"])
  },
  created() {
    this.getData();
  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
