import { ApiModel } from 'src/models/api.model';

export namespace TodosModel {
  export interface Todo {
    id: number;
    userId: number;
    title: string;
    completed: false;
  }

  export type TodoListResponse = ApiModel.ListResponse<Readonly<Todo>>;

  export interface TodoListParams extends ApiModel.PaginationQueryParams<Todo> {
    readonly userId: string;
    readonly completed: 'true' | 'false';
  }
}
