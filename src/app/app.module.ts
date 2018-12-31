import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AppRouting } from './app.routing';
import { MaterialModule } from './modules/material/material.module';
import { AuthGuard } from './services/auth.guard';
import { MainNavbarComponent } from './components/main-navbar/main-navbar.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { ColeccionesComponent } from './components/colecciones/colecciones.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminGuard } from './services/admin.guard';
@NgModule({
  declarations: [
    AppComponent,
    MainNavbarComponent,
    UserInfoComponent,
    ColeccionesComponent,
    PerfilComponent
  ],
  imports: [
    BrowserModule,
    AppRouting,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, 
    AngularFireStorageModule, // imports firebase/storage only needed for storage features,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [
    AuthGuard,
    AdminGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
