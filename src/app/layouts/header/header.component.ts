import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
})
export class HeaderComponent implements OnInit {
  constructor() {}
  src = 'https://i.ibb.co/jJB2b0h/todo.png';
  
  ngOnInit(): void {}
}
