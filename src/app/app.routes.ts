import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './views/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './views/auth-layout/auth-layout.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadComponent: () => import('./views/home/home.component').then(m => m.HomeComponent),
        data: { title: 'Home' }
    },
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            {
                path: 'session',
                loadChildren: () => import('./views/auth-layout/auth.route').then(m => m.AUTH_ROUTES)
            }
        ]
    },
    {
        path: '',
        component: AdminLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./feature/dashboard/dashboard.component').then(m => m.DashboardComponent),
                data: { title: 'Main Dashboard' }
            }
        ]
    }
];
