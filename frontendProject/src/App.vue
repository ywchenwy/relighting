<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/live">Live</router-link>
  </nav>
  <router-view />
</template>
<script setup></script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 10px;

  a {
    font-weight: bold;
    color: #fff;
    display: inline-block;
    width: 120px;
    height: 50px;
    line-height: 50px;
    border-radius: 25px;
    text-decoration: none;
    &:hover {
      background-image: linear-gradient(to top, #accbee 0%, #e7f0fd 100%);
    }
    &.router-link-exact-active {
      color: #42b983;
      background-image: linear-gradient(to top, #a8edea 0%, #fed6e3 100%);
    }
  }
}
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
body {
  height: 100%;
  min-height: 100vh;
  background: linear-gradient(180deg, #fb3333 28.13%, #ba00fc 89.58%),
    linear-gradient(0deg, #ffffff, #ffffff);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}
</style>
