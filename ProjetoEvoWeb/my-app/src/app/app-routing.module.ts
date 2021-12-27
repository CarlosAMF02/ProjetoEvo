import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuncionarioComponent } from './views/funcionario/funcionario.component';
import { HomeComponent } from './views/home/home.component';

const routes: Routes = [{
  path:'',
  component: HomeComponent
},
{
  path:'funcionario',
  component: FuncionarioComponent
},
{
  path:'funcionario/:id',
  component: FuncionarioComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
