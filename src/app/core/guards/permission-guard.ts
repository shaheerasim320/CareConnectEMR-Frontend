import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Permission } from "../auth/permissions";
import { hasPermission } from "../auth/role-permissions";

export const permissionGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const authService = inject(AuthService);

    const requiredPermission = route.data['permission'] as Permission;

    if(!requiredPermission) return true;

    const userRole = authService.currentUser()?.role;

    if(hasPermission(userRole, requiredPermission)) return true;

    router.navigate(['/dashboard']);
    return false;
}