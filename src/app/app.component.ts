import { Component } from '@angular/core';

import { TodoDataService } from './todo-data.service';
import { Todo } from './todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ TodoDataService ]
})
export class AppComponent {

  newTodo: Todo = new Todo();
  todos: Todo[];
  searchText: string = '';

  title = 'app';

  constructor(private todoDataService: TodoDataService) {
    this.todos = todoDataService.todos;
  }

  addTodo() {
    this.todoDataService.addTodo(this.newTodo);
    this.newTodo = new Todo();
  }

  toggleTodoComplete(todo) {
    this.todoDataService.toggleTodoComplete(todo);
  }

  removeTodo(todo: Todo) {
    this.todoDataService.deleteTodoById(todo.id);
    this.todos = this.todoDataService.getAllTodos();
  }

  getTodos() {
    return this.todoDataService.getAllTodos();
  }

  getDoneTodos() {
    return this.todoDataService.getDoneTodos();
  }

  SearchTodo() {
    this.todos = this.todoDataService.searchTodo(this.searchText);
  }

  SearchClear() {
    this.searchText = '';
  }
}
