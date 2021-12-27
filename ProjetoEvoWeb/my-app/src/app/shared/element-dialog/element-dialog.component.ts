import {Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DepartamentoElement } from 'src/app/models/DepartamentoElement'; 

@Component({
  selector: 'app-element-dialog',
  templateUrl: './element-dialog.component.html'
})
export class ElementDialogComponent implements OnInit {
  element!: DepartamentoElement;
  isChange!: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: DepartamentoElement,
    public dialogRef: MatDialogRef<ElementDialogComponent>) {}

  ngOnInit(): void {
    if (this.data.id != null) {
      this.isChange = true;
    } else {
      this.isChange = false;
    }
  }

  getElement():DepartamentoElement{
    let dados={
      id:this.data.id,
      nome:this.data.nome,
      sigla:this.data.sigla
    }
    return dados
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}