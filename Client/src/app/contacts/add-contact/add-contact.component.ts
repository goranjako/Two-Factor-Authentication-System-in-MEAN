import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from '../contact.service';
import { AuthService } from 'src/app/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SwalService } from 'src/app/shared/swal.service';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss'],
})
export class AddContactComponent implements OnInit {
  user: any;
  userId: any;
  errorMessage$: any;
  constructor(
    private router: Router,
    private toast: SwalService,
    private servis: ContactService,
    private toke: AuthService,
    private loading: NgxSpinnerService
  ) {}
  swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger',
    },
    buttonsStyling: false,
  });

  ngOnInit() {
    this.getuser();
  }

  registerForm = new FormGroup({
    firstName: new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.pattern('[a-zA-Z0-9_-]{3,15}$'),
      ])
    ),
    lastName: new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.pattern('[a-zA-Z0-9_-]{3,15}$'),
      ])
    ),
    email: new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        Validators.maxLength(25),
      ])
    ),
    address: new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('[a-zA-Z0-9_-]{3,15}$'),
      ])
    ),
    phone: new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
      ])
    ),
  });
  //geters
  get firstName() {
    return this.registerForm.get('firstName');
  }
  get lastName() {
    return this.registerForm.get('lastName');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get address() {
    return this.registerForm.get('address');
  }
  get phone() {
    return this.registerForm.get('phone');
  }

  //submit
  onSubmit(f: any): void {
    const data = {
      firstName: f.firstName,
      lastName: f.lastName,
      email: f.email,
      address: f.address,
      phone: f.phone,
      userId: this.userId,
    };
    this.loading.show(),
      Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.servis.postContact(f).subscribe({
            next: (res: any) => {
              Swal.fire('Saved!', '', 'success');
              this.loading.hide();
              this.toast.success(res.message);
              const id = res.userId;
              this.router.navigate(['/verify', { id: id }]);
              this.registerForm.reset();
            },
            error: (err: any) => {
              this.toast.err(err.error.message);
              this.registerForm.reset();
              this.loading.hide();
            },
          });
        }
      });
  }
  getuser() {
    this.user = this.toke.getToken();
    return (this.userId = this.user._id);
  }
}
