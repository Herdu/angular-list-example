import { ApiModel } from 'src/models/api.model';

export namespace TodosModel {
  export interface Todo {
    id: number;
    userId: number;
    title: string;
    completed: false;
  }

  export interface TodosListFilters {
    readonly userId: string;
    readonly completed: 'true' | 'false';
    readonly title: string;
  }

  export type TodoListResponse = ApiModel.ListResponse<Readonly<Todo>>;

  export type TodoListResolverData = ApiModel.ResolverData<TodoListResponse>;

  export type TodoListParams = ApiModel.PaginationQueryParams &
    TodosListFilters;
}
