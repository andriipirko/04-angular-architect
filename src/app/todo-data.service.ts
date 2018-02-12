import { Injectable } from '@angular/core';

import { Todo } from './todo';

@Injectable()
export class TodoDataService {
  private lastId: number = 0;
  public todos: Todo[] = [];
  private all_todos: Todo[] = this.todos;

  constructor() { }

  addTodo(todo: Todo): TodoDataService {
    if (!todo.id) {
      todo.id = ++this.lastId;
    }
    this.todos.push(todo);
    return this;
  }

  deleteTodoById(id: number): TodoDataService {
    this.todos = this.todos.filter(todo => todo.id != id);
    return this;
  }

  updateTodoById(id: number, values: Object = {}): Todo {
    let todo = this.getTodoById(id);
    if (!todo) {
      return null;
    }
    Object.assign(todo, values);
    return todo;
  }

  getAllTodos(): Todo[] {
    return this.todos;
  }

  getTodoById(id: number): Todo {
    return this.todos
      .filter(todo => todo.id === id)
      .pop();
  }

  toggleTodoComplete(todo: Todo): Todo {
    let updatedTodo = this.updateTodoById(todo.id, {
      complete: !todo.complete
    });
    return updatedTodo;
  }

  getDoneTodos(): number {
    return this.todos.filter(todo => todo.complete === true).length;
  }

  searchTodo(searchText: string): Todo[] {
    if (searchText == '') {
      this.todos = this.all_todos;
      return this.todos;
    }
    this.all_todos = this.todos;
    this.todos = this.todos.filter(todo => todo.title.toLowerCase().includes(searchText.toLowerCase()));
    return this.todos;
  }

  

}
