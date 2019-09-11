<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Liam Bell - Clixifix ToDo's App</span>
        <span class="font-weight-light"></span>
      </v-toolbar-title>
      <v-toolbar-items class="ma-3">
        <v-btn text to="/">HOME</v-btn>
        <v-btn text to="/help">HELP</v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-content>
      <transition name="fade" mode="out-in">
      <keep-alive>
      <router-view />
      </keep-alive>
      </transition>
    </v-content>
  </v-app>
</template>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
