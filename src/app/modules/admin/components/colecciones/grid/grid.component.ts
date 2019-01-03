import {Component, OnInit, ViewChild, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { ICollection } from 'src/app/models/collection';
import { typeWithParameters } from '@angular/compiler/src/render3/util';

@Component({
  selector: 'collection-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.less']
})
export class GridComponent implements OnInit, OnChanges {
  @Input('collections') collections: ICollection[];
  @Output() onAddCollection: EventEmitter<any> = new EventEmitter();
  @Output() onEditCollection: EventEmitter<ICollection> = new EventEmitter();
  @Output() onDeleteCollection: EventEmitter<ICollection> = new EventEmitter();

  displayedColumns: string[] = ['name', 'description', 'image', 'options'];
  dataSource: MatTableDataSource<ICollection>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor() { 
   
  }
  ngOnChanges(changes){
    if(changes.collections)
      this.setDatasource();
  }
  ngOnInit() {
  }
  setDatasource(){
    if(this.collections){
      this.dataSource = new MatTableDataSource(this.collections);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  addCollection(collection:ICollection){
    this.onAddCollection.emit();
  }
  editCollection(collection:ICollection){
    this.onEditCollection.emit(collection);
  }
  deleteCollection(collection:ICollection){
    this.onDeleteCollection.emit(collection);
  }
}
