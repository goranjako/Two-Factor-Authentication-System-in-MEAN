import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { SwalService } from 'src/app/shared/swal.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private router: Router,
    private log: AuthService,
    private toast: SwalService,
    private loading: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.registerForm = new FormGroup({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
          Validators.maxLength(25),
        ])
      ),
      userName: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('[a-zA-Z0-9_-]{3,15}$'),
        ])
      ),
      password: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(25),
        ])
      ),
    });
  }
  //geters
  get userName() {
    return this.registerForm.get('userName');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  //submit
  onSubmit(f: any): void {
    this.loading.show(),
      this.log.register(f).subscribe({
        next: (res) => {
          this.loading.hide();
          this.toast.success(res.message);
          const id=res.userId;
          this.router.navigate(['/verify', {id:id}]);
          this.registerForm.reset();
          this.loading.hide();
        },
        error: (err) => {
          this.toast.err(err.error.message);
          this.registerForm.reset();
          this.loading.hide();
        },
      });
  }
}
