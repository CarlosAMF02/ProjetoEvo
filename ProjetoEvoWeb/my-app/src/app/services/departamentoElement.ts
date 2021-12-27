import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DepartamentoElement } from '../models/DepartamentoElement';

@Injectable()
export class DepartamentoElementService {
    elementApiUrl = 'http://localhost:5097/evo/departamento'

  constructor(private http: HttpClient){}

  public getElements():Observable<any> {
    return this.http.get(this.elementApiUrl)
  }

  public getElement(id: number):Observable<any>{
    return this.http.get<DepartamentoElement>(`${this.elementApiUrl}/${id}`)
  }

  createElement(element: DepartamentoElement): Observable<any> {
    let departamento = {
      nome: element.nome,
      sigla: element.sigla
    }
    return this.http.post<DepartamentoElement>(this.elementApiUrl, departamento);
  }

  public editElement(element: DepartamentoElement):Observable<any>{
    return this.http.put(`${this.elementApiUrl}/${element.id}`, element)
  }

  public deleteElement(id: number):Observable<any>{
    return this.http.delete(`${this.elementApiUrl}/${id}`)
  } 
}