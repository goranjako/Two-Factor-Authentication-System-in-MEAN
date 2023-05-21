import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { SwalService } from 'src/app/shared/swal.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {
  user:any;
  userId:any;
  sub:any;
    errorMessage$: any;

    constructor(
      private route:ActivatedRoute,
      private routers: Router,
      private loginService: AuthService,
      private toast: SwalService,
      private loading: NgxSpinnerService
    ) {

    }

    ngOnInit(): void {   this.userId = this.route.snapshot.params;}


    loginForm = new FormGroup({
      otp: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(6),
        ])
      )

    });
    //get email
    get otp() {
      return this.loginForm.get('otp');
    }
    //get password

    //submit Form
    onSubmit(f: any) {
     const data = {id:this.userId.id,otp:f.otp};
     console.log(data)
      this.loading.show(),
        this.loginService.verify(data).subscribe({
          next: (res:any) => {
            this.loading.hide();
            this.toast.success(res.msg);
            this.routers.navigate(['contacts']);
            this.loginForm.reset();
            this.loginService.getToken();
            this.loading.hide();
          },
          error: (err:any) => {
            this.toast.err(err.error.msg);
            this.loginForm.reset();
            this.routers.navigate(['register']);
            this.loading.hide();
          },
        });
    }

}
