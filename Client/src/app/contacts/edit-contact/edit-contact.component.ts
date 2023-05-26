import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/auth/auth.service';
import { SwalService } from 'src/app/shared/swal.service';
import { ContactService } from '../contact.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss']
})
export class EditContactComponent {
  
  data: any;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toast: SwalService,
    private servis:ContactService,
    private toke: AuthService,
    private loading: NgxSpinnerService,

  ) {
    this.data = this.route.snapshot.params;
  }

  editForm = new FormGroup({
    firstName: new FormControl(
      null,
      Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.pattern('[a-zA-Z0-9_-]{3,15}$'),
      ])
    ),
    lastName: new FormControl(null,
      Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.pattern('[a-zA-Z0-9_-]{3,15}$')
      ])
    ),
    email: new FormControl(
      null,
      Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        Validators.maxLength(25),
      ])
    ),
    address: new FormControl(
      null,
      Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('[a-zA-Z0-9_-]{3,15}$'),
      ])
    ),
    phone: new FormControl(
      null,
      Validators.compose([
        Validators.required,
        Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]
      )
    ),
  })

  ngOnInit(): void {

  this.getcontact();
}


//geters
get firstName() {
  return this.editForm.get('firstName')
}
get lastName() {
  return this.editForm.get('lastName')
}
get email() {
  return this.editForm.get('email')
}
get address() {
  return this.editForm.get('address')
}
get phone() {
  return this.editForm.get('phone')
}


getcontact() {

  this.editForm.setValue({
    'firstName':this.data.firstName,
    'lastName':this.data.lastName,
    'email':this.data.email,
    'address':this.data.address,
    'phone':this.data.phone,
  })

};

onSubmit(f: any): void {
 const data={
    "_id":this.data._id,
    "firstName":f.firstName,
    "lastName":f.lastName,
    "email":f.email,
    "address":f.address,
    "phone":f.phone,
    "userId":this.data.userId
  }
  Swal.fire({
    title: 'Do you want to save the changes?',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Save',
    denyButtonText: `Don't save`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
    ///////////
      Swal.fire('Saved!', '', 'success')
      this.loading.hide();
      this.router.navigate(["/contacts"])
    } else if (result.isDenied) {
      Swal.fire('Changes are not saved', '', 'info')
      this.router.navigate(["/contacts"])
    }
  })

}

}
