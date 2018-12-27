import {MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCheckboxModule, MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS, MatMenuModule, MatIconModule} from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [],
  exports: [MatMenuModule, MatIconModule, MatSnackBarModule, MatCardModule,MatFormFieldModule, MatInputModule,MatButtonModule, MatCheckboxModule],
  // providers:[
  //   {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, usevalue:{duration:2500, horozontalPosition:'center', verticalPosition:'top'}}
  // ]
})
export class MaterialModule { }
