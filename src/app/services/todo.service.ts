import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Todo } from './../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos: Todo[] = [];
  private API = 'https://tododb-23ff.restdb.io/rest/todos';
  private options = {
    headers: {
      'x-apikey': environment.apiKey,
    },
  };
  private _didChange: Subject<boolean> = new Subject();
  constructor(private http: HttpClient) {}

  getTodos = (): any => {
    return this.http.get(this.API, this.options);
  };
  deleteTodo = (todo: any) => {
    this.http.delete(this.API + '/' + todo._id, this.options).subscribe({
      next: () => {
        this.deleteTodoLocal(todo);
        this._didChange.next(true);
      },
      error: () => {
        this._didChange.next(false);
      },
    });
  };

  get didChange(): Observable<boolean> {
    return this._didChange.asObservable();
  }

  createTodo = (todo: Todo) => {
    this.http.post(this.API, todo, this.options).subscribe({
      next: () => {
        this._didChange.next(true);
      },
      error: () => {
        this._didChange.next(false);
      },
    });
  };

  changeStatus = (todo: any) => {
    this.http.put(this.API + '/' + todo._id, todo, this.options).subscribe({
      next: () => {
        this.changeStatusLocal(todo);
        this._didChange.next(true);
      },
      error: () => {
        this._didChange.next(false);
      },
    });
  };
  changeStatusLocal = (todo: Todo) => {
    this.todos.map((currTodo) => {
      if (currTodo.id === todo.id) {
        todo.isComplete = !todo.isComplete;
      }
    });
  };

  deleteTodoLocal = (todo: Todo) => {
    const indexOfTodo = this.todos.findIndex(
      (currTodo) => currTodo.id === todo.id
    );
    this.todos.splice(indexOfTodo, 1);
  };
}

let l = {
  headers: { normalizedNames: {}, lazyUpdate: null, headers: {} },
  status: 0,
  statusText: 'Unknown Error',
  url: 'https://tododb-23ff.restdb.io/rest/todos',
  ok: false,
  name: 'HttpErrorResponse',
  message:
    'Http failure response for https://tododb-23ff.restdb.io/rest/todos: 0 Unknown Error',
  error: { isTrusted: true },
};
