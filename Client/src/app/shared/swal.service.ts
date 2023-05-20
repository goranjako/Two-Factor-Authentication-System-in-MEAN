import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root',
})
export class SwalService {
  constructor() {}

  success(s: any) {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: s,
      showConfirmButton: false,
      timer: 4000,
    });
  }
  err(text: any) {
    Swal.fire({
      icon: 'warning',
      position: 'center',
      title: 'Oops...',
      text: text,
    });
  }
  warning(text: any) {
    Swal.fire({
      icon: 'warning',
      position: 'center',
      title: 'Oops...',
      text: "ERR_CONNECTION_REFUSED",
    });
  }
  logaut() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'You have been successfully logged out',
    });
  }
  info1(){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }



   swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })


}

