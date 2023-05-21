import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { SwalService } from 'src/app/shared/swal.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private loginService: AuthService,
    private toast: SwalService,
    private loading: NgxSpinnerService
  ) {}

  ngOnInit(): void {}

  loginForm = new FormGroup({
    email: new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        Validators.maxLength(25),
      ])
    ),
    password: new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(25),
      ])
    ),
  });
  //get email
  get email() {
    return this.loginForm.get('email');
  }
  //get password
  get password() {
    return this.loginForm.get('password');
  }
  //submit Form
  onSubmit(f: any) {
    this.loading.show(),
      this.loginService.login(f).subscribe({
        next: (res:any) => {
          this.loading.hide();
          this.toast.success(res.msg);
          this.router.navigate(['/contacts']);
          this.loginForm.reset();
          this.loginService.getToken();
          this.loading.hide();
        },
        error: (err:any) => {
          this.toast.err(err.error.msg);
          this.loginForm.reset();
          this.router.navigate(['register']);
          this.loading.hide();
        },
      });
  }

}
