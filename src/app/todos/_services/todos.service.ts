import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { ApiModel } from 'src/models/api.model';
import { TodosModel } from '../models/todos.model';

@Injectable()
export class TodosService {
  constructor(private readonly _httpClient: HttpClient) {}

  getTodosList(
    params: TodosModel.TodoListParams,
  ): Observable<TodosModel.TodoListResponse> {
    return this._httpClient
      .get<TodosModel.Todo[]>('https://jsonplaceholder.typicode.com/todos', {
        params: params as Params,
        observe: 'response',
      })
      .pipe(
        map((response: HttpResponse<TodosModel.Todo[]>) => {
          const totalCount: number = +response.headers.get('x-total-count');
          const pageSize: number = +(
            params['_limit'] || ApiModel.DEFAULT_PAGE_SIZE
          );

          return {
            items: response.body,
            totalCount: totalCount,
            pageCount: Math.ceil(totalCount / pageSize),
          };
        }),
        delay(200),
      );
  }
}
