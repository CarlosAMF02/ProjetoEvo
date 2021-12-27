import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FuncionarioElement } from '../models/FuncionarioElement';

@Injectable()
export class FuncionarioElementService {
    elementApiUrl = 'http://localhost:5097/evo/funcionario'

  constructor(private http: HttpClient){}

  public getElements():Observable<FuncionarioElement[]> {
    return this.http.get<FuncionarioElement[]>(this.elementApiUrl)
  }

  public getElement(id: number):Observable<any>{
    return this.http.get<FuncionarioElement>(`${this.elementApiUrl}/${id}`)
  }

  createElement(element: FuncionarioElement): Observable<any> {
    let funcionario = {
      nome: element.nome,
      departamentoId: element.departamentoId,
      rg:element.rg,
      foto:element.foto,
    }
    return this.http.post<FuncionarioElement>(this.elementApiUrl, funcionario);
  }

  public editElement(element: FuncionarioElement):Observable<any>{
    return this.http.put(`${this.elementApiUrl}/${element.id}`, element)
  }

  public deleteElement(id: number):Observable<any>{
    return this.http.delete(`${this.elementApiUrl}/${id}`)
  } 
}