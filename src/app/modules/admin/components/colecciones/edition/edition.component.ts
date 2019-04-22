import { Component, OnInit, Input, OnChanges, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ICollection, Collection, ISection, Section } from 'src/app/models/collection';
import { CollectionService } from 'src/app/services/collection.service';
import { CollectionEditionFormComponent } from './collection-edition-form/collection-edition-form.component';
import { EditionSectionComponent } from './edition-section/edition-section.component';
import { Router } from '@angular/router';

@Component({
  selector: 'collection-edition',
  templateUrl: './edition.component.html',
  styleUrls: ['./edition.component.less']
})
export class EditionComponent implements OnInit {
  @Input('collection') collection: ICollection;
  @ViewChild(CollectionEditionFormComponent) collectionForm: CollectionEditionFormComponent;
  @ViewChild(EditionSectionComponent) sections: EditionSectionComponent;
  guardando: boolean = false;
  constructor(
    private collectionService: CollectionService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {

  }
  save() {
    const coll = this.collectionForm.getData();
    
    if (coll) {
      coll.sections = this.sections.getData();
      if (coll.uid == null)
        this.collectionService.create(coll)
          .then(res => {
            this.snackBar.open(`Se ha guardado la nueva colección`, 'OK', { duration: 3000 });
            this.guardando = false;
          })
          .catch(err => {
            this.snackBar.open(`Se ha producido un error--> ${err.message}`, 'OK', { duration: 0 });
            this.guardando = false;
          })
      else {

        this.collectionService.update(coll)
          .then(res => {
            this.snackBar.open(`Se ha actualizado la colección`, 'OK', { duration: 3000 });
            this.guardando = false;
          })
          .catch(err => {
            this.snackBar.open(`Se ha producido un error--> ${err.message}`, 'OK', { duration: 0 });
            this.guardando = false;
          })
      }
    }

  }
  toDashboard(){
    this.router.navigateByUrl('/');
  }
}
