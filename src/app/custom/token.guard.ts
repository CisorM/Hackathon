import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { getCookie } from '../Authentication/login/cookies';

export const authGuard: CanActivateFn = () => {
    const router = inject(Router);
    const token = getCookie('access_token');
    if (!token) {
        router.navigate(['/']);
        return false;
    }
    return true;
};
