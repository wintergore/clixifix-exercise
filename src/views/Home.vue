<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" width="100" height="100" />
    <label v-if="!searchName" for="user">
      <h3>To Get Started Enter your Full Name</h3>
      <input id="user" v-model="myName" required="required" placeholder="try 'Leanne Graham'" @keypress.enter="onClick" />
      <button @click="onClick">Submit</button>
    </label>
    <Users :my-name="searchName" v-on:onBack="clear" />
    <span class="validation">{{ msg }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import Users from '@/components/Users.vue';

// used to capitalize, move to a string helper class;
const ucfirst = (text: string) =>
  text
    .toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');

@Component({
  components: {
    HelloWorld,
    Users,
  },
})
export default class Home extends Vue {
  private myName: string = 'Joe Bloggs';
  private searchName: string = '';
  private msg: string = "";

  public onClick() {
    let name = this.myName.trim();
    if (name.length <= 0) {
      this.msg = 'Please enter a valid name';
    }
    if (name)
    this.searchName = this.myName.trim();
  }

  public clear() {
    this.myName = '';
    this.searchName = '';
  }

  @Watch('myName')
  private capitalize() {
    this.myName = ucfirst(this.myName);
  }
}
</script>
<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>

