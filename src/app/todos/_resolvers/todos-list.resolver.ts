import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Params, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiModel } from 'src/models/api.model';
import { TodosModel } from '../models/todos.model';
import { TodosService } from '../_services/todos.service';

@Injectable()
export class TodosListResolver implements Resolve<TodosModel.TodoListResponse> {
  constructor(private readonly _todosService: TodosService) {}

  // map query params into TodosList params
  private _prepareParams(queryParams: Params): TodosModel.TodoListParams {
    const page: number = queryParams['page'] ? +queryParams['page'] : 1;

    const limit: number = queryParams['limit']
      ? +queryParams['limit']
      : ApiModel.DEFAULT_PAGE_SIZE;

    const userId: string = queryParams['userId'];
    const completed: 'true' | 'false' = ['true', 'false'].includes(
      queryParams['completed'],
    )
      ? queryParams['completed']
      : null;

    const todoListParams: TodosModel.TodoListParams = {
      _start: `${(page - 1) * limit}`,
      _limit: `${limit}`,
      ...(completed ? { completed } : null),
      ...(userId ? { userId } : null),
    };

    return todoListParams;
  }

  resolve(
    route: ActivatedRouteSnapshot,
  ): Observable<TodosModel.TodoListResponse> {
    const queryParams: Params = route.queryParams;
    const todoListParams = this._prepareParams(queryParams);
    return this._todosService.getTodosList(todoListParams);
  }
}
