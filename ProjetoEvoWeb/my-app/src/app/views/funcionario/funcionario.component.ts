import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { FuncionarioElement } from 'src/app/models/FuncionarioElement';
import { FuncionarioElementService } from 'src/app/services/funcionarioElement';
import { FelementDialogComponent } from 'src/app/shared/felement-dialog/felement-dialog.component';


@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.css'],
  providers: [FuncionarioElementService]
})
export class FuncionarioComponent implements OnInit {

  @ViewChild(MatTable)
  table!: MatTable<any>;
  displayedColumns: string[] = ['nome', 'rg', 'action'];
  dataSource!: FuncionarioElement[];
  data!:[]
  id!: string | null | number
  atualizarTabela(){
    this.dataSource = []
    if ( this.id == null ) {
      this.funcionarioElementService.getElements().subscribe(data => {this.dataSource = data})
    } else {
      this.funcionarioElementService.getElements().subscribe(data => {this.dataSource = data.filter(f => (f.departamentoId).toString() == this.id)})
    }
  }
  constructor(
    public dialog: MatDialog,
    private funcionarioElementService: FuncionarioElementService,
    private route: ActivatedRoute){
      this.id = this.route.snapshot.paramMap.get('id')
      this.atualizarTabela()
    }

  ngOnInit(): void {}

  openDialog(element: FuncionarioElement | null): void {
    const dialogRef = this.dialog.open(FelementDialogComponent, {
      width: '250px',
      data: element == null ? {
        id: null,
        nome: '',
        rg: '',
        foto:'',
        departamento: null,
        departamentoId:this.id
      } : {
        id: element.id,
        nome: element.nome,
        rg: element.rg,
        foto:element.foto,
        departamento: element.departamento,
        departamentoId:element.departamentoId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (this.dataSource.map(p => p.id).includes(result.id)) {
          this.funcionarioElementService.editElement(result)
            .subscribe((data: FuncionarioElement) => {
              const index = this.dataSource.findIndex(p => p.id === data.id);
              this.dataSource[index] = data;
              this.atualizarTabela();
              this.table.renderRows();
            });
        } else {
          this.funcionarioElementService.createElement(result)
            .subscribe((data: FuncionarioElement) => {
              this.dataSource.push(data);
              this.atualizarTabela();
              this.table.renderRows();
            });
        }
      }
    });
  }
  editElement(element: FuncionarioElement): void {
    this.openDialog(element);
  }

  deleteElement(id: number): void {
    this.funcionarioElementService.deleteElement(id)
      .subscribe(() => {
        this.dataSource = this.dataSource.filter(p => p.id !== id);
      });
  }
}
