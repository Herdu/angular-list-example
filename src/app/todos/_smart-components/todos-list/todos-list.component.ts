import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractListComponent } from 'src/models/abstract-list.component';
import { TodosModel } from '../../models/todos.model';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosListComponent extends AbstractListComponent<TodosModel.Todo> {
  readonly displayedColumns: string[] = [
    'ordinalNumber',
    'userId',
    'title',
    'completed',
    'actions',
  ];

  constructor(
    protected readonly _activatedRoute: ActivatedRoute,
    protected readonly _router: Router,
  ) {
    super(_activatedRoute, _router);
  }
}
