import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router, NavigationExtras } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private toastr: ToastrService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error) {
          switch (error.status) {
            case 400:
              if (error.error.errors) {
                const modalStateErrors = [];
                for (const key in error.error.errors) {
                  if (error.error.errors[key]) {
                    modalStateErrors.push(error.error.errors[key]);
                  }
                }
                throw modalStateErrors.flat();
              } else if (typeof error.error === 'object') {
                this.toastr.error(error.error.title, error.status);
                console.error(error);
              } else {
                this.toastr.error(error.error);
                // this.toastr.error(error.error, error.status);
              }
              break;
            case 401:
              // if (error.error === null) {
              //   this.toastr.error('Please login to continue');
              //   this.router.navigateByUrl('/login');
              // } else {
              //   this.toastr.error(error.error, error.status);
              // }
              this.toastr.error('Please login to continue');
              this.router.navigateByUrl('/login')
              break;
              case 403:
                this.toastr.error("You do not have permission to access this resource");
                this.router.navigateByUrl('');
                break;
            case 404:
              this.router.navigateByUrl('/not-found');
              break;
            case 500:
              const navigationExtras: NavigationExtras = {
                state: { error: error.error },
              };
              this.router.navigateByUrl('/server-error', navigationExtras);
              break;
            default:
              this.toastr.error('Something unexpected went wrong');
              console.log(error);
              break;
          }
        }
        return throwError(error);
      })
    );
  }
}
