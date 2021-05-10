import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Todo } from './../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos: Todo[] = [];
  constructor() {
    this.todos = [
      {
        id: '111',
        title: 'Learn Angular',
        isComplete: true,
        date: new Date(),
      },
      {
        id: '112',
        title: 'Learn Angular sdadsa',
        isComplete: true,
        date: new Date(),
      },
      {
        id: '113',
        title: 'Learn Angular',
        isComplete: false,
        date: new Date('08/25/2020'),
      },
    ];
  }
  getTodos = () => {
    return of(this.todos.sort((a, b) => (a.date > b.date ? 1 : 0)));
  };

  createTodo = (todo: Todo) => {
    this.todos.push(todo);
  };

  changeStatus = (todo: Todo) => {
    this.todos.map((currTodo) => {
      if (currTodo.id === todo.id) {
        todo.isComplete = !todo.isComplete;
      }
    });
  };

  deleteTodo = (todo: Todo) => {
    const indexOfTodo = this.todos.findIndex(
      (currTodo) => currTodo.id === todo.id
    );
    this.todos.splice(indexOfTodo, 1);
  };
}
