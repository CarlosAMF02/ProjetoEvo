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
    this.funcionarioElementService.getElementDependency(Number(this.id)).subscribe(data => {this.dataSource = data})
  }
  constructor(
    public dialog: MatDialog,
    private funcionarioElementService: FuncionarioElementService,
    private route: ActivatedRoute){
      this.id = this.route.snapshot.paramMap.get('id')
      this.atualizarTabela()
    }

  ngOnInit(): void {}

  verNumerico (val: string) : boolean {
    return !isNaN(Number(val));
 }
  verificador(element: FuncionarioElement):boolean{
    if(element.rg!='' && element.nome!='' && element.foto!=''){
      if (this.verNumerico(element.rg)==true){
        return true
      } else {
        alert("O valor de rg é numérico")
        return false
      }
    } else {
      alert("Preencha todos os campos")
      return false
    }
  }

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
      if (this.verificador(result)==true){
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
      }} else {
        console.log("Erro no cadastro de dados")
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
