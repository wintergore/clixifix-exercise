<template>
  <div class="about">
    <h1>Helpful info:</h1>
    <p>Tip: Check out Leanne Graham's ToDo List!.</p>
    <section>
      <h4>RAW DATA: User</h4>
      <pre>{{ User }}</pre>
    </section>
    <section>
      <h4>RAW DATA: ToDos</h4>
      <pre>{{ ToDos }}</pre>
    </section>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import ToDoModel from "@/models/ToDoModel";
import UserModel from "@/models/ToDoModel";
import store from "../store";

@Component({
  store
})
export default class Users extends Vue {
  get ToDos(): ToDoModel[] {
    const todos = this.$store.state.todos;
    return todos;
  }

  get User(): UserModel {
    const user = this.$store.state.user;
    return user;
  }
}
</script>
