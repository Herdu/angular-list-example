import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodosListResolver } from './_resolvers/todos-list.resolver';
import { TodosListComponent } from './_smart-components/todos-list/todos-list.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: TodosListComponent,
    resolve: {
      listData: TodosListResolver,
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodosRoutingModule {}
