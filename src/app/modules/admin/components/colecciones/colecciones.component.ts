import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { CollectionService } from 'src/app/services/collection.service';
import { ICollection } from 'src/app/models/collection';
@Component({
  selector: 'app-colecciones',
  templateUrl: './colecciones.component.html',
  styleUrls: ['./colecciones.component.less']
})
export class ColeccionesComponent implements OnInit {
  collections: ICollection[];
  collectionEdit: ICollection;
  constructor(
    private collectionService: CollectionService, 
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {

    this.collectionService.collectionsSuccess$.subscribe(
      (collections)=>{
        this.collections = collections;
        this.snackBar.open('Las colecciones han sido devueltas.','OK');
      },
      (error)=>{
        this.snackBar.open('Se ha producido un error al obtener las collecciones.','OK');
      }
    )
    this.collectionService.getCollections();
  }
  addCollection(collection:ICollection){
    this.collectionEdit = null;
  }
  editCollection(collection:ICollection){
    this.collectionEdit = collection;
  }
  deleteCollection(collection:ICollection){
    this.collectionService.delete(collection);
  }
}
