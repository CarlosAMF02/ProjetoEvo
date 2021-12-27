import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { DepartamentoElement } from 'src/app/models/DepartamentoElement';
import { DepartamentoElementService } from 'src/app/services/departamentoElement';
import { ElementDialogComponent } from 'src/app/shared/element-dialog/element-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DepartamentoElementService]
})
export class HomeComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>;
  displayedColumns: string[] = ['nome', 'sigla', 'action'];
  dataSource!: DepartamentoElement[];
  data!: []
  atualizarTabela() {
    this.dataSource = []
    this.departamentoElementService.getElements().subscribe(data => { this.dataSource = data })
  }
  constructor(
    public dialog: MatDialog,
    private departamentoElementService: DepartamentoElementService) { this.atualizarTabela() }

  ngOnInit(): void {
  }

  verNumerico(val: string): boolean {
    return !isNaN(Number(val));
  }
  verificador(element: DepartamentoElement): boolean {
    if (element.nome != '' && element.sigla != '') {
      return true
    } else {
      alert("Preencha todos os campos")
      return false
    }
  }

  openDialog(element: DepartamentoElement | null): void {
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: '250px',
      data: element == null ? {
        id: null,
        nome: '',
        sigla: ''
      } : {
        id: element.id,
        nome: element.nome,
        sigla: element.sigla
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (this.verificador(result) == true) {
          if (this.dataSource.map(p => p.id).includes(result.id)) {
            this.departamentoElementService.editElement(result)
              .subscribe((data: DepartamentoElement) => {
                const index = this.dataSource.findIndex(p => p.id === data.id);
                this.dataSource[index] = data;
                this.atualizarTabela();
                this.table.renderRows();
              });
          } else {
            this.departamentoElementService.createElement(result)
              .subscribe((data: DepartamentoElement) => {
                this.dataSource.push(data);
                this.atualizarTabela();
                this.table.renderRows();
              });
          }
        }
      } else {
        console.log("Erro no cadastro de dados")
      }
    });
  }

  editElement(element: DepartamentoElement): void {
    this.openDialog(element);
  }

  deleteElement(id: number): void {
    this.departamentoElementService.deleteElement(id)
      .subscribe(() => {
        this.dataSource = this.dataSource.filter(p => p.id !== id);
      });
  }
}
