import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/auth/auth.service';
import { SwalService } from 'src/app/shared/swal.service';

@Component({
  selector: 'app-verify-contact',
  templateUrl: './verify-contact.component.html',
  styleUrls: ['./verify-contact.component.scss']
})
export class VerifyContactComponent implements OnInit {
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
            this.loading.hide();
          },
          error: (err:any) => {
            this.toast.err(err.error.msg);
            this.loginForm.reset();
            this.routers.navigate(['contacts']);
            this.loading.hide();
          },
        });
    }

}
