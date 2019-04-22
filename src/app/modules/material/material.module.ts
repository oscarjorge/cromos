import { MatTabsModule, MatToolbarModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCheckboxModule, MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS, MatMenuModule, MatIconModule, MatSortModule, MatTableModule, MatPaginatorModule} from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [],
  exports: [ MatTabsModule, MatToolbarModule, MatPaginatorModule, MatSortModule, MatTableModule, MatMenuModule, MatIconModule, MatSnackBarModule, MatCardModule,MatFormFieldModule, MatInputModule,MatButtonModule, MatCheckboxModule],
  // providers:[
  //   {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, usevalue:{duration:2500, horozontalPosition:'center', verticalPosition:'top'}}
  // ]
})
export class MaterialModule { }
