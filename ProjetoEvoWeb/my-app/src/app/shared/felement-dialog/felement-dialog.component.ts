import {Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FuncionarioElement } from 'src/app/models/FuncionarioElement';

@Component({
  selector: 'app-felement-dialog',
  templateUrl: './felement-dialog.component.html',
  styleUrls: ['./felement-dialog.component.css']
})
export class FelementDialogComponent implements OnInit {
  element!: FuncionarioElement;
  isChange!: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: FuncionarioElement,
    public dialogRef: MatDialogRef<FelementDialogComponent>) {}

  ngOnInit(): void {
    if (this.data.id != null) {
      this.isChange = true;
    } else {
      this.isChange = false;
    }
  }

  getElement():FuncionarioElement{
    let dados={
      id:this.data.id,
      nome:this.data.nome,
      rg:this.data.rg,
      foto:this.data.foto,
      departamentoId:this.data.departamentoId,
    }
    return dados
  }
  onCancel(): void {
    this.dialogRef.close();
  }
}
