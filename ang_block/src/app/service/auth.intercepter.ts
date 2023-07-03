import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "./api.service";



@Injectable()

export class AuthInterceptor implements HttpInterceptor
{
    constructor(private _service:ApiService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // throw new Error("Method not implemented.");
        //Coding //


        ///add the jwt token(local storage) request
        let authReq=req;
        const token=this._service.getToken();
        console.log("inside interceptor token");
        if(token!=null){
            authReq = authReq.clone({
                setHeaders:{Authorization:`bearer ${token}`},
        });
        }
        return next.handle(authReq);
    }

}

export const authInterceptorProviders=[
    {
        provide:HTTP_INTERCEPTORS,
        useClass:AuthInterceptor,
        multi:true,
    },
];
