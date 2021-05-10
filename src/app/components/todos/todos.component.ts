import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { Todo } from 'src/app/models/todo.model';
import * as moment from 'moment';
@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.less'],
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos;
    });
  }

  checkDateOver = (date: Date) => {
    return moment().isAfter(date);
  };
  changeTodoStatus = (todo: Todo) => {
    this.todoService.changeStatus(todo);
  };
  deleteTodo = (todo: Todo) => {
    this.todoService.deleteTodo(todo);
  };
}
