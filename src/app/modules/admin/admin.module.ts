import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CromosComponent } from './components/cromos/cromos.component';
import { ColeccionesComponent } from './components/colecciones/colecciones.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { AdminRouting } from './admin.routing';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CromosComponent, ColeccionesComponent, UsuariosComponent],
  imports: [
    CommonModule,
    AdminRouting,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
