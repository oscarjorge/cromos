import { AppComponent } from "./app.component";
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { AuthGuard } from './services/auth.guard';

const ROUTES: Routes = [
    // {
    //     path:'',
    //     canActivate:[AuthGuard],
    //     component: AppComponent
    // },
    {
        path: 'auth',
        loadChildren: './modules/login/login.module#LoginModule'
    },
    
    {
        path:'',
        component: AppComponent
    }
]
export const AppRouting: ModuleWithProviders = RouterModule.forRoot(ROUTES)