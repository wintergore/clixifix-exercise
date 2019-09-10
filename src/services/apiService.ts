import Axios from 'axios'
import ToDoModel from '@/models/ToDoModel';

Axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';

export default class ApiService {
    public async getUser(name: string) {
        return await Axios.get(`/users?name=${name}`);
    }

    public async putUser(name: string) {
        return await Axios.post('/users', {name: name}, {
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
    }

    public async getUserTodos(userId: number) {
        return await Axios.get(`/todos?userId=${userId}`);
    }

    public async putToDo(todo: ToDoModel) {
        return await Axios.post('/todos', todo, {
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
    }
    
    public async deleteToDo(todo: ToDoModel) {
        return await Axios.delete(`/todos/${todo.id}`);
    }

    public async updateToDo(todo: ToDoModel) {
        return await Axios.put(`/todos/${todo.id}`, {completed: todo.completed});
    }
}