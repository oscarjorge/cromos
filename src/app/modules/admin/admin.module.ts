import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CromosComponent } from './components/cromos/cromos.component';
import { ColeccionesComponent } from './components/colecciones/colecciones.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { AdminRouting } from './admin.routing';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GridComponent } from './components/colecciones/grid/grid.component';
import { EditionComponent } from './components/colecciones/edition/edition.component';
import { NumberOnlyDirective } from './directives/number.directive';
import { EditionSectionComponent } from './components/colecciones/edition/edition-section/edition-section.component';
import { CollectionEditionFormComponent } from './components/colecciones/edition/collection-edition-form/collection-edition-form.component';

@NgModule({
  declarations: [NumberOnlyDirective, CromosComponent, ColeccionesComponent, UsuariosComponent, GridComponent, EditionComponent, EditionSectionComponent, CollectionEditionFormComponent],
  imports: [
    CommonModule,
    AdminRouting,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
