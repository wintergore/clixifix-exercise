<template>
  <div class="user-todos" v-if="myName">
    <section>
      <header>
        <v-btn grey @click="onBack">Back</v-btn>
        <h4>{{ `${myName}'s ToDo List` }}</h4>
      </header>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-text-field
              v-if="myName"
              class="pt-3"
              v-model="model.title"
              required="required"
              :rules="msg"
              label="Add to your list'"
              @keyup.enter="addToDo"
              outlined
              clearable
            ></v-text-field>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn class="mb-4" @click="addToDo">Submit</v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>

      <v-card class="mx-auto" max-width="500">
        <v-list shaped>
          <v-list-item-group v-model="model" multiple v-for="n in [0,1]" :key="n">
            <v-divider v-if="n == 1"></v-divider>
            <template v-for="todo in ToDos.filter(x => x.completed == n).reverse()">
              <v-list-item
                :key="todo.id"
                :value="todo"
                active-class="deep-purple--text text--accent-4"
              >
                <template v-slot:default="{ active, toggle }">
                  <v-list-item-content>
                    <v-list-item-title v-text="todo.title"></v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-checkbox
                      :input-value="todo.completed"
                      :true-value="todo.completed"
                      color="deep-purple accent-4"
                      @click="updateToDo(todo)"
                    ></v-checkbox>
                  </v-list-item-action>
                  <v-list-item-action>
                    <v-btn dark icon ripple color="red" @click="deleteToDo(todo)">
                      <v-icon color="red" class="white--text">x</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </template>
              </v-list-item>
            </template>
          </v-list-item-group>
        </v-list>
      </v-card>
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
    return count > 0 ? `${count} completed.` : "";
  }

  @Emit("onBack")
  onBack() {
    this.$store.commit("clearUser");
  }

  @Watch("User")
  public onUserChanged(user: UserModel) {
    if (user !== undefined && user !== null) {
      console.log("onUserChanged", user);
      store.dispatch("getUserToDos", user.id);
    }
  }

  @Watch("myName")
  public onMyNameChanged(name: string) {
    store.dispatch("getUser", name);
  }

  public addToDo() {
    store.dispatch("addToDo", this.model);
    this.model = new ToDoModel();
  }

  public deleteToDo(todo: ToDoModel) {
    if (confirm(`remove ${todo.title}?`)) store.dispatch("deleteToDo", todo);
  }

  public updateToDo(todo: ToDoModel) {
    let mockTodo = new ToDoModel();
    mockTodo.id = todo.id;
    mockTodo.userId = todo.userId;
    mockTodo.title = todo.title;
    mockTodo.completed = !todo.completed;
    //disable while posting.
    store.dispatch("updateToDo", mockTodo);
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
      &::before {
        content: "Completed:";
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
.done {
  text-decoration: line-through;
}
</style>
