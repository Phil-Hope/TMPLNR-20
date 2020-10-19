import {Injectable} from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import {Observable, throwError, from} from 'rxjs';
import {map, catchError, switchMap} from 'rxjs/operators';

import {Storage} from '@ionic/storage';

import {AlertController} from "@ionic/angular";


const TOKEN_KEY = 'token';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

    public headers: any = {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    };
    constructor(private storage: Storage, private alertCtrl: AlertController) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // YOU CAN ALSO DO THIS
        // const token = this.authenticationService.getToken()

        return from(this.storage.get(TOKEN_KEY))
            .pipe(
                switchMap(token => {
                    if (token) {
                        request = request.clone({headers: request.headers.set('Authorization', 'Bearer ' + token)});
                    }
                    if (!request.headers.has('Content-Type')) {
                        request = request.clone({headers: request.headers.set('Content-Type', 'application/json')});
                    }
                    return next.handle(request).pipe(
                        map((event: HttpEvent<any>) => {
                            if (event instanceof HttpResponse) {
                                // do nothing for now
                            }
                            return event;
                        }),
                        catchError((error: HttpErrorResponse) => {
                            const status = error.status;
                            const reason = error && error.error.reason ? error.error.reason : '';

                            this.presentAlert(status, reason);
                            return throwError(error);
                        })
                    );
                })
            );
    }

    async presentAlert(status, reason) {
        const alert = await this.alertCtrl.create({
            header: status + ' Error',
            subHeader: 'An Error Occurred!',
            message: reason,
            buttons: ['OK']
        });

        await alert.present();
    }
}
