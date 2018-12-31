import { Routes, RouterModule } from '@angular/router';
import { ColeccionesComponent } from './components/colecciones/colecciones.component';
import { CromosComponent } from './components/cromos/cromos.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';

const ROUTES: Routes = [
    {
        path:'colecciones',
        component: ColeccionesComponent
    },
    {
        path:'cromos',
        component: CromosComponent
    },
    {
        path:'users',
        component: UsuariosComponent
    },
]
export const AdminRouting = RouterModule.forChild(ROUTES)