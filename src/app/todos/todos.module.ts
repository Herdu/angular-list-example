import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { TodosRoutingModule } from './todos-routing.module';
import { TODOS_DUMB_COMPONENTS } from './_dumb-components';
import { TODOS_RESOLVERS } from './_resolvers';
import { TODOS_SERVICES } from './_services';
import { TODOS_SMART_COMPONENTS } from './_smart-components';

@NgModule({
  declarations: [...TODOS_SMART_COMPONENTS, ...TODOS_DUMB_COMPONENTS],
  imports: [
    CommonModule,
    TodosRoutingModule,
    MatPaginatorModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatSortModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
  ],
  providers: [...TODOS_SERVICES, ...TODOS_RESOLVERS],
})
export class TodosModule {}
