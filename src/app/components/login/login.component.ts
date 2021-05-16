import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent {
  credentials = {
    email: '',
    password: '',
  };
  constructor(
    private auth: AuthService,
    private popup: NzMessageService,
    private router: Router
  ) {}

  get isHorizontal(): boolean {
    return window.innerWidth > 575 ? true : false;
  }

  onSubmit = () => {
    console.log(this.credentials.email, this.credentials.password);
    this.auth.login(this.credentials.email, this.credentials.password).then(
      () => {
        this.popup.success('Login Successful');
        this.router.navigate(['']);
        this.credentials.email = '';
        this.credentials.password = '';
      },
      () => {
        this.popup.error('Invalid Credentials');
      }
    );
  };
}
