import { AppComponent } from "./app.component";
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { AuthGuard } from './services/auth.guard';
import { ColeccionesComponent } from './components/colecciones/colecciones.component';
import { PerfilComponent } from './components/perfil/perfil.component';

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
        path:'colecciones',
        component: ColeccionesComponent
    },
    {
        path:'perfil',
        component: PerfilComponent,
        canActivate:[AuthGuard]
    },
    
    {
        path:'',
        component: ColeccionesComponent,
    },
    
    
    
    
]
export const AppRouting: ModuleWithProviders = RouterModule.forRoot(ROUTES)