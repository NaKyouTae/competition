import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtService } from 'src/app/shared/common/jwt/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  public adminCheck: any = this.jwt.getJWTAccessKey('roles').includes('ROLE_ADMIN');

  constructor(private router: Router, private jwt: JwtService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.adminCheck === true) {
      return true;
    }

    this.router.navigateByUrl('/three');
    return false;

  }
}
