import {angular} from './../lib/angular.es6'
import {Todo} from './../models/todo'

var STORAGE_ID = 'ANGULAR-MVC';

export class TodoStorage {
  //public todos:Array<Todo>
  //public localStorage:LocalStorage
  constructor() {
    this.todos = [];
    this.localStorage = window.localStorage;
  }

  clearCompleted() {
    var completeTodos = [], incompleteTodos = [];

    this.todos.forEach(function (todo) {
      if (todo.completed) {
        completeTodos.push(todo);
      } else {
        incompleteTodos.push(todo);
      }
    });
    angular.copy(incompleteTodos, this.todos);
    this._saveToLocalStorage(this.todos);
  }

  delete(todo:Todo) {
    this.todos.splice(this.todos.indexOf(todo), 1);
    this._saveToLocalStorage(this.todos);
  }

  get():Array {
    this.todos = this._getFromLocalStorage();
    return this.todos;
  }

  insert(todo:Todo) {
    this.todos.push(todo);
    this._saveToLocalStorage(this.todos);
  }

  put(todo:Todo, index:number) {
    this.todos[index] = todo;
    this._saveToLocalStorage(this.todos);
  }

  _getFromLocalStorage():Array {
    return JSON.parse(this.localStorage.getItem(STORAGE_ID) || '[]').
        map(data => new Todo(data.title, data.completed));
  }

  _saveToLocalStorage(todos:Array) {
    this.localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
  }
}