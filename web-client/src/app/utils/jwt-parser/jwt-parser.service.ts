import { Injectable } from '@angular/core';
import jwt_decode from "jwt-decode";


@Injectable({
    providedIn: 'root'
})
export class JwtParser {
  
    decode(token: string): { [key: string]: any } {
        if (!token) return;
        try {
            return jwt_decode(token);
        } catch(e) {
            console.log(e);
            return;
        }
        
    }
}