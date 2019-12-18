import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
      })
      .pipe(
        map((items: TodosModel.Todo[]) => ({
          items,
          totalCount: 200,
          pageCount: 10,
        })),
      );
  }
}
