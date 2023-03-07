import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment.prod';
import { AuthenticationService } from '@features/service/authentication-service/authentication.service';
import { MOODLE_JWT_TOKEN } from '@features/service/authentication-service/constants';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const user = this.authenticationService.User;
        const isLoggedIn = user
        
        const isApiUrl = request.url.startsWith(environment.baseURL);
        
        if (isLoggedIn && isApiUrl) {
            var jwt_token = localStorage.getItem(MOODLE_JWT_TOKEN)
            jwt_token = jwt_token!==null?JSON.parse(jwt_token):''
            request = request.clone({
                setHeaders: { Authorization: `Bearer ${jwt_token}` }
            });
        }

        return next.handle(request);
    }
}
