import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {TokenStorageService} from './service/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class NoauthGuard implements CanActivate {

  constructor(private router: Router, private tokenStorage: TokenStorageService){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.tokenStorage.getToken()) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;

    }
  }
  
}
