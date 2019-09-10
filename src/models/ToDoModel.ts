export default class ToDoModel {
    public userId?: number;
    public id?: number;
    public title: string;
    public completed: boolean;
    constructor() {
        this.title = '';
        this.completed = false;
    }
}
