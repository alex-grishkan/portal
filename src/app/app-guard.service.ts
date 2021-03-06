import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import * as fromApp from './store/app.reducer';
import { User } from "./auth/user.model";

@Injectable({providedIn: 'root'})
export class AppGuard implements CanActivate {
	user: User;

	constructor(
		private router: Router,
		private store: Store<fromApp.AppState>) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
		this.store.select('auth').subscribe(auth => {
			this.user = auth.user
		});

		if (!!this.user) {
			return true;
		};

		return this.router.createUrlTree(['']);
	}
}