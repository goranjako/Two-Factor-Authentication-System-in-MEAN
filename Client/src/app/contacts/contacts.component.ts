import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Contact } from './contact';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger',
    },
    buttonsStyling: false,
  });

  gridColumns = 4;

  constructor(
    private router: Router,
    private token: AuthService,
    private loading: NgxSpinnerService
  ) {
   
  }
  contacts: any;
  user: any;
  userId: any;
  ngOnInit(): void {
    
  }
  trackByMethod(index: number, data: Contact) {
    return data._id;
  }
  add(){
    this.router.navigate(["contacts/add"]);
  }
  edit(contact: any) {
    this.router.navigate(['contacts/edit', contact]);
  }

  delete(id: any) {
    this.swalWithBootstrapButtons
      .fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) { 
          this.swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your contact has been deleted.',
            'success'
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          this.swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your contact is safe ',
            'error'
          );
        }
      });
  }
  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }

}
