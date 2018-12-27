import { LoginComponent } from './components/login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { MainComponent } from './main/main.component';

const ROUTES: Routes = [
    {
        path:'login',
        component: LoginComponent
    },
    {
        path:'register',
        component: RegisterComponent
    },
    {
        path:'',
        component: MainComponent
    },
]
export const LoginRouting = RouterModule.forChild(ROUTES)