export class Todo {
  title:string;
  completed:boolean;

  constructor(title:string, completed:boolean) {
    this.title = title;
    this.completed = completed;
  }

  clone():Todo {
    return new Todo(this.title, this.completed);
  }
}