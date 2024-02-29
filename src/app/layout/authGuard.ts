import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
} from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        // Burada kimlik doğrulama mantığını ekleyin.
        // Örneğin, kullanıcı giriş yapmışsa true dönebilir, aksi takdirde false veya yönlendirme yapabilirsiniz.
        // Bu sadece temel bir örnektir, projenize göre özelleştirmeniz gerekebilir.

        const isAuthenticated = true; // Örnek: Kullanıcı giriş yapmış mı?

        if (isAuthenticated) {
            return true;
        } else {
            // Kullanıcı giriş yapmamışsa, login sayfasına yönlendir.
            this.router.navigate(['/login']);
            return false;
        }
    }
}
