import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Params, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiModel } from 'src/models/api.model';
import { TodosModel } from '../models/todos.model';
import { TodosService } from '../_services/todos.service';

@Injectable()
export class TodosListResolver implements Resolve<TodosModel.TodoListResponse> {
  constructor(private readonly _todosService: TodosService) {}

  resolve(
    route: ActivatedRouteSnapshot,
  ): Observable<TodosModel.TodoListResponse> {
    const queryParams: Params = route.queryParams;
    const todoListParams: TodosModel.TodoListParams = this._prepareParams(
      queryParams,
    );
    return this._todosService.getTodosList(todoListParams);
  }

  // map query params into TodosList params
  private _prepareParams(queryParams: Params): TodosModel.TodoListParams {
    const paginationQueryParams: ApiModel.PaginationQueryParams = ApiModel.preparePaginationQueryParams(
      queryParams,
    );

    const userId: string = queryParams['userId'] || null;
    const completed: 'true' | 'false' = ['true', 'false'].includes(
      queryParams['completed'],
    )
      ? queryParams['completed']
      : null;

    const title: string = queryParams['title'] || null;

    const todosListFilters: TodosModel.TodosListFilters = {
      ...(completed ? { completed } : null),
      ...(userId ? { userId } : null),
      ...(title ? { title } : null),
    };

    const todoListParams: TodosModel.TodoListParams = {
      ...paginationQueryParams,
      ...todosListFilters,
    };

    return todoListParams;
  }
}
