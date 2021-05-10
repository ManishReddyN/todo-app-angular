import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';
import { v4 as uuid } from 'uuid';
import * as moment from 'moment';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.less'],
})
export class TodoFormComponent implements OnInit {
  todoTitle: string = '';
  todoDate: Date | null;
  todoTime: Date | null;
  finalDate: Date = new Date();
  datePart: string = '';
  timePart: string = '';
  constructor(private todoService: TodoService) {
    this.todoDate = null;
    this.todoTime = null;
  }

  ngOnInit(): void {}
  handleDate = (date: Date) => {
    this.datePart = moment(date).format('YYYY-MM-DD');
    console.log(this.datePart);
    this.todoDate = new Date(date);
  };
  handleTime = (date: Date) => {
    this.timePart = moment(date).format('HH:mm');
    console.log(this.timePart);
    this.todoTime = new Date(date);
  };
  handleAdd = () => {
    this.finalDate = new Date(this.datePart + 'T' + this.timePart);
    const newTodo: Todo = {
      id: uuid(),
      title: this.todoTitle,
      date: this.finalDate,
      isComplete: false,
    };
    this.todoService.createTodo(newTodo);
    this.todoTitle = '';
    this.todoDate = null;
    this.todoTime = null;
  };
}
