import { Component, OnInit, Input, ViewChild, OnChanges } from '@angular/core';
import { ICollection, ISection, Section } from 'src/app/models/collection';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'collection-edition-section',
  templateUrl: './edition-section.component.html',
  styleUrls: ['./edition-section.component.less']
})
export class EditionSectionComponent implements OnInit, OnChanges {
  @Input('collection') collection: ICollection;

  displayedColumns: string[] = ['name', 'description', 'options'];
  dataSource: MatTableDataSource<ICollection>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  form: FormGroup;
  sectionEdit: ISection = new Section();
  constructor() { }

  ngOnChanges(changes) {
    this.sectionEdit = new Section();
    this.setForm();
    this.setDatasource();
  }
  ngOnInit() {

  }
  setDatasource() {
      this.dataSource = new MatTableDataSource( (this.collection.sections)?this.collection.sections:[]);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  }
  setForm() {
    this.form = new FormGroup({
      name: new FormControl((this.sectionEdit) ? this.sectionEdit.name : '', Validators.required),
      description: new FormControl((this.sectionEdit) ? this.sectionEdit.description : ''),
      notes: new FormControl((this.sectionEdit) ? this.sectionEdit.notes : '')
    })
  }
  getData() {
    return this.collection.sections;
  }
  save() {
    if (this.form.valid) {
      if (this.sectionEdit.uid) {
        this.sectionEdit.name = this.form.get('name').value;
        this.sectionEdit.description = this.form.get('description').value;
        this.sectionEdit.notes = this.form.get('notes').value;
        this.setDatasource();
      }
      else {
        this.sectionEdit = new Section();
        this.sectionEdit.uid = String(Date.now());
        this.sectionEdit.collection_uid = this.collection.uid;
        this.sectionEdit.name = this.form.get('name').value;
        this.sectionEdit.description = this.form.get('description').value;
        this.sectionEdit.notes = this.form.get('notes').value;
        if(!this.collection.sections)
          this.collection.sections = [];
        this.collection.sections.push(this.sectionEdit);
        this.setDatasource();
      }

    }
  }
  addSection() {
    this.sectionEdit = new Section();
    this.setForm();
  }
  editSection(row: ISection) {
    this.sectionEdit = this.collection.sections.find(s=>s.uid == row.uid);
    this.setForm();
  }
  deleteSection(row: ISection) {

  }
}
