import {angular} from './lib/angular.es6';
import {TodoStorage} from './services/todoStorage';
import {TodoCtrl} from './controllers/todoCtrl';
import {todoEscape} from './directives/todoEscape';
import {todoFocus} from './directives/todoFocus';

angular.module('todomvc', [])
  .service('store', TodoStorage)
  .controller('TodoCtrl', TodoCtrl)
  .directive('todoFocus', todoFocus)
  .directive('todoEscape', todoEscape);

angular.bootstrap(window.document, ['todomvc']);