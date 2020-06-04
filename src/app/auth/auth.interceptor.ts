import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { SqlResponse } from './../shared/sql.interface';

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
    // constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // const modifiedReq = req.clone({
        //     params: new HttpParams().set('api', 'WiSPrTacOavaaSFsAYWW6tgasvmCzfvV0')
        // });

        req.params.set('api', 'WiSPrTacOavaaSFsAYWW6tgasvmCzfvV0');

        // if (!!this.authService.user) {
        //     // modifiedReq.params.set('token', this.authService.token);
        //     req.params.set('token', localStorage.getItem('token'));
        // }
        req.params.set('token', localStorage.getItem('token'));

        return next.handle(req);
        // .pipe(tap({
        //     next: (res) => {
        //         if (res instanceof HttpResponse) {
        //             const sqlResponse: SqlResponse = res.body;
        //             if (sqlResponse.token === null) {
        //                 if (!!this.authService.token) {
        //                     alert('You have been Logged Out. Please SignIn Again');
        //                     this.authService.signOut();
        //                 }
        //             }
        //         }
        //     }
        // }));
    }
}
