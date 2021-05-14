import { Component, OnInit, OnDestroy } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { Todo } from 'src/app/models/todo.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.less'],
})
export class TodosComponent implements OnInit, OnDestroy {
  todos: Todo[] = [];
  time: Date = new Date();
  didChange!: Subscription;

  constructor(
    private todoService: TodoService,
    private popup: NzMessageService
  ) {}
  momentVar = moment;
  timeId!: any;
  ngOnInit(): void {
    this.todoService.getTodos().subscribe((todos: Todo[]) => {
      todos.sort((a, b) => (a.date > b.date ? 1 : 0));
      this.todos = todos;
    });
    this.timeId = setInterval(() => {
      this.time = new Date();
    }, 1000);
    this.didChange = this.todoService.didChange.subscribe((valuesChanged) => {
      if (valuesChanged === true) {
        this.getTodos();
        this.popup.success('Successful :)');
      } else {
        this.popup.error('Unsuccessful Attempt :(');
        this.getTodos();
      }
    });
  }
  ngOnDestroy() {
    clearInterval(this.timeId);
  }
  getTodos = () => {
    this.todoService.getTodos().subscribe((todos: Todo[]) => {
      todos.sort((a, b) => (a.date > b.date ? 1 : 0));

      this.todos = todos;
    });
  };

  checkDateOver = (date: Date) => {
    return moment().isAfter(date);
  };
  changeTodoStatus = (todo: Todo) => {
    this.todoService.changeStatus(todo);
  };
  deleteTodo = async (todo: Todo) => {
    this.todoService.deleteTodo(todo);
  };
}
