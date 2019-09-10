<template>
  <div class="user-todos" v-if="myName">
    <section>
    <header>
      <button @click="onBack">Back</button>
      <h4>{{ `${myName}'s ToDo List` }}</h4>
    </header>
        <label v-if="myName" for="addToDo">
      <input
        id="addToDo"
        v-model="model.title"
        placeholder="Add to your list"
        @keypress.enter="addToDo"
      />
      <button @click="addToDo">Add</button>
    </label>
    <ul>
      <li v-if="!(ToDos.length > 0)">Add something to the list</li>
      <li v-else v-for="todo in ToDos.filter(x => !x.completed)" :key="todo.id">
        <label :for="todo.id">
          {{ todo.title }}
          <input :id="todo.id" type="checkbox" :checked="todo.completed" @click="updateToDo(todo)" />
        </label>
        <button @click="deleteToDo(todo)">x</button>
      </li>
    </ul>
    <ul class="user-todos-completed">
      <li v-for="todo in ToDos.filter(x => x.completed)" :key="todo.id">
        <label :for="todo.id">
          {{ todo.title }}
          <input :id="todo.id" type="checkbox" :checked="todo.completed" @click="updateToDo(todo)" />
        </label>
        <button @click="deleteToDo(todo)">x</button>
      </li>
    </ul>
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
  @Prop() private myName!: string;
  private model: ToDoModel;
  private user?: UserModel;

  constructor() {
    super();
    this.model = new ToDoModel();
  }

  get ToDos(): ToDoModel[] {
    const todos = this.$store.state.todos;
    return todos;
  }

  get User(): UserModel {
    const user = this.$store.state.user;
    return user;
  }

  get CompletedCount(): string {
    let count = this.ToDos.filter(x => x.completed).length;
    return count > 0 ? `${count} completed.` : '';
  }

  @Emit("onBack")
  onBack() {
    this.$store.commit("clearUser");
  }

  @Watch("User")
  public onUserChanged(user: UserModel) {
    if (user !== undefined && user !== null) {
      console.log('onUserChanged', user);
      store.dispatch('getUserToDos', user.id);
    }
  }

  @Watch("myName")
  public onMyNameChanged(name: string) {
    store.dispatch('getUser', name);
  }

  public addToDo() {
    store.dispatch("addToDo", this.model);
    this.model = new ToDoModel();
  }

  public deleteToDo(todo: ToDoModel) {
    if(confirm(`remove ${todo.title}?`)) store.dispatch('deleteToDo', todo);
  }

  public updateToDo(todo: ToDoModel) {
    let mockTodo = new ToDoModel();
    mockTodo.id = todo.id;
    mockTodo.userId = todo.userId;
    mockTodo.title = todo.title;
    mockTodo.completed = !todo.completed;
    //disable while posting.
    store.dispatch('updateToDo', mockTodo);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.user-todos {
  display: flex;
  justify-content: space-evenly;
  padding: 32px;
  flex-wrap: wrap;
  .user-todos-completed {
    &:not(:empty) {
      border-top: 1px solid black;
      &::before{
        content: 'Completed:';
        display: block;
        padding-top: 16px;
      }
      li {
        padding-top: 8px;
      }
    }
  }
  section {
    min-width: 250px;
  }
  header {
    display: flex;
    justify-content: center;
    align-items: center;
    button {
      margin-right: 8px;
    }
  }
  li + li {
    padding-top: 8px;
  }
}
</style>
