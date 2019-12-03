import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
declare let alertify: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public containerHeight;
  public temp;
  form: FormGroup;
  constructor(public loginservice: LoginService) { }

  ngOnInit() {
    this.temp = document.getElementsByTagName('body')[0];
    this.containerHeight = this.temp.offsetHeight - 64;

    this.form = new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(6), Validators.maxLength(8)]
      })
    })
  }

  onLogin() {
    if(this.form.invalid)
      return;
    const userData = {
      emailId: this.form.value.email,
      password: this.form.value.password
    }
    this.loginservice.onLogin(userData).subscribe(data =>{
      alertify.success(data.message);
    })
  }

}
