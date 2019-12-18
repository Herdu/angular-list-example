import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractListComponent } from 'src/models/abstract-list.component';
import { TodosModel } from '../../models/todos.model';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosListComponent extends AbstractListComponent<TodosModel.Todo>
  implements OnInit {
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
    protected readonly _changeDetectorRef: ChangeDetectorRef,
  ) {
    super(_activatedRoute, _router, _changeDetectorRef);
  }

  ngOnInit(): void {
    super.ngOnInit();
    // just an example of extending ngOnInit from AbstractListComponent
  }
}
