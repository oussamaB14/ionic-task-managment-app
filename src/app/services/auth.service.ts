import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth) {}
  signup(credentials: any) {
    createUserWithEmailAndPassword(
      this.auth,
      credentials.email,
      credentials.password
    );
  }
  signin() {}
}
