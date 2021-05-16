import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-logout',
  template: '<div>Logged Out</div>',
})
export class LogoutComponent {
  constructor(
    private auth: AuthService,
    private popup: NzMessageService,
    private router: Router
  ) {
    this.auth.signOut().then(
      () => {
        this.popup.success('Logged Out');
        this.router.navigate(['login']);
      },
      () => {
        this.popup.success('You must be logged in to perform the action');
        this.router.navigate(['login']);
      }
    );
  }
}
