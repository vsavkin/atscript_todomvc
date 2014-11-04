import {angular} from './../lib/angular.es6';
import {Todo} from './../models/todo';
import {TodoStorage} from './../services/todoStorage';

export class TodoCtrl {
  newTodo:string;
  editedTodo:Todo;
  originalTodo:Todo;
  todos:Array;
  store:TodoStorage;

  constructor($scope, $filter, store:TodoStorage) {
    this.store = store;
    this.todos = $scope.todos = store.get();

    this.newTodo = '';
    this.editedTodo = null;
    this.originalTodo = null;

    this._setUpWatch($scope, $filter);
  }

  addTodo() {
    var newTodo = new Todo(this.newTodo.trim(), false);

    if (!newTodo.title) return;

    this.store.insert(newTodo);
    this.newTodo = '';
  }

  saveEdits(todo:Todo) {
    todo.title = todo.title.trim();

    if (todo.title !== undefined) {
      this.saveTodo(todo);
    } else {
      this.removeTodo(todo);
    }

    this.editedTodo = null;
  }

  revertEdits(todo:Todo) {
    this.todos[this.todos.indexOf(todo)] = this.originalTodo;
    this.editedTodo = null;
    this.originalTodo = null;
  }

  editTodo(todo:Todo) {
    this.editedTodo = todo;
    this.originalTodo = todo.clone();
  }

  removeTodo(todo:Todo) {
    this.store.delete(todo);
  }

  saveTodo(todo:Todo) {
    this.store.put(todo, this.todos.indexOf(todo));
  }

  clearCompletedTodos() {
    this.store.clearCompleted();
  }

  markAll(completed:boolean) {
    this.todos.forEach((todo) => {
      todo.completed = completed;
      this.saveTodo(todo);
    });
  }

  _setUpWatch($scope, $filter) {
    $scope.$watch('todos', () => {
      this.remainingCount = $filter('filter')(this.todos, {completed: false}).length;
      this.completedCount = this.todos.length - this.remainingCount;
      this.allChecked = !this.remainingCount;
    }, true);
  }
}