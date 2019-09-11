<template>
  <v-container fluid>
    <v-row>
      <v-spacer></v-spacer>
      <v-col cols="6">
          <v-card class="ma-3 pa-6" outlined tile>
            <label v-if="!searchName" for="user">
              <h3>To Get Started Enter your Full Name</h3>
              <v-text-field
                class="pt-3"
                v-model="myName"
                required="required"
                :rules="msg"
                label="try 'Leanne Graham'"
                @keypress.enter="onClick"
                outlined
                clearable
              ></v-text-field>
              <v-btn dark color="primary" @click="onClick">Submit</v-btn>
            </label>
            <Users :my-name="searchName" v-on:onBack="clear" />
          </v-card>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import Users from "@/components/Users.vue";

// used to capitalize, move to a string helper class;
const ucfirst = (text: string) =>
  text
    .toLowerCase()
    .split(" ")
    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
    .join(" ");

@Component({
  components: {
    HelloWorld,
    Users
  }
})
export default class Home extends Vue {
  private myName: string = "Joe Bloggs";
  private searchName: string = "";
  private msg: string[] = [""];

  public onClick() {
    let name = this.myName.trim();
    if (name.length <= 0) {
      this.msg = ["Please enter a valid name"];
    } else {
      this.msg = [""];
    }
    if (name) this.searchName = this.myName.trim();
  }

  public clear() {
    this.myName = "";
    this.searchName = "";
  }

  @Watch("myName")
  private capitalize() {
    this.myName = ucfirst(this.myName);
  }
}
</script>

