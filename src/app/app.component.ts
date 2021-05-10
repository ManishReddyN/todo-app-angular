import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  title = 'todo-app';
  todoImgSrc = '../assets/todo.png';
  collapsedWidth = 0;
}
