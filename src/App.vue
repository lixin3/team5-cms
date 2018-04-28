<template>
  <div id="app">
    <!-- <mainPage/> -->
    <!-- <userManage/> -->
    <!-- <userdetails/> -->
    <router-view></router-view>
  </div>
</template>

<script>
import mainPage from './components/mainPage'
import userManage from './components/userManage'
import userdetails from './components/user/userdetails'
export default {
  name: 'App',
  components:{
    mainPage,
    userManage,
    userdetails
  }
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
