import Vue from 'vue';
import Vuex from 'vuex';
import ToDoModel from './models/ToDoModel';
import ApiService from'./services/apiService';
import UserModel from './models/UserModel';
import { AxiosResponse } from 'axios';
Vue.use(Vuex);

// If the app was larger, I would split the store, and services for User & ToDos
const apiService = new ApiService();

export default new Vuex.Store({
  state: {
    todos: Array<ToDoModel>(),
    user: <UserModel>{},
  },
  mutations: {
    setUser(state, user: UserModel) {
      state.user = user;
    },
    clearUser(state) {
      state.user = <UserModel>{};
      state.todos = new Array<ToDoModel>();
    },
    addToDo(state, todoModel: ToDoModel) {
      state.todos.push(todoModel);
    },
    setToDos(state, todoList: Array<ToDoModel>) {
      state.todos = todoList;
    },
    deleteToDo(state, id: number) {
      state.todos = state.todos.filter(x => x.id != id);
    },
    updateToDo(state, todo: ToDoModel) {
      var foundIndex = state.todos.findIndex(x => x.id == todo.id);
      state.todos[foundIndex].completed = todo.completed;
    }
  },
  actions: {
    async getUser({dispatch, commit}, name: string) {
      await apiService.getUser(name).then((response: any) => {
        let user = <UserModel>response.data[0];
        if (user) {
          commit('setUser', user);
        } else {
          dispatch('putUser', name);
        }
      }).catch((e) => {
        console.log('getUser error', e);
      });
    },
    async putUser({dispatch, commit}, name: string) {
      await apiService.putUser(name).then((response: any) => {
        let user = <UserModel>response.data;
        if (user) {
          commit('setUser', user);
        } else {
          console.log('Api Error: returned invalid user', user);
        }
      }).catch((e) => {
        console.log('putUser error', e);
      });
    },
    async getUserToDos({commit}, userId: number) {
      await apiService.getUserTodos(userId).then((response) => {
        let toDos: Array<ToDoModel> = response.data;
        commit('setToDos', toDos);
      }).catch((e) => {
        console.log('getUserToDos error', e);
      });
    },
    async addToDo({commit}, toDo: ToDoModel) {
     toDo.userId = this.state.user.id;
     await apiService.putToDo(toDo).then((response) => {
       commit('addToDo', <ToDoModel> response.data);
     })
    },
    async deleteToDo({commit}, todo: ToDoModel) {
      await apiService.deleteToDo(todo).then((response) => {
        if (Object.entries(response.data).length === 0 && response.data.constructor === Object) {
          commit('deleteToDo', todo.id);
        }
      })
    },
    async updateToDo({commit}, todo: ToDoModel) {
      await apiService.updateToDo(todo).then((response) => {
        var updatedTodo = <ToDoModel>response.data;
        if (updatedTodo) commit('updateToDo', updatedTodo);
      }).catch((e) => {
        console.log('updateToDo Error:', e);
      });
    }
  },
});
