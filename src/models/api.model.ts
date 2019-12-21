import { Params } from '@angular/router';

export namespace ApiModel {
  export const DEFAULT_PAGE_SIZE: number = 10;
  export const DEFAULT_PAGE: number = 10;

  export enum SORT_DIR {
    DESC = 'desc',
    ASC = 'asc',
  }

  export const PAGE_SIZE_OPTIONS: number[] = [10, 20, 30];

  // these are strings because ALL query params are always strings
  export interface PaginationQueryParams<
    T extends { [key: string]: any } = {}
  > {
    readonly _start?: string;
    readonly _limit?: string;
    readonly sortBy?: keyof T;
    readonly sortDir?: SORT_DIR;
  }

  export interface ListResponse<T> {
    readonly totalCount: number;
    readonly pageCount: number;
    readonly items: T[];
  }

  /*
    Ta metoda przygotowuje obiekt z polami:
    _start
    _limit
    sortField
    sortDir
  */
  export const preparePaginationQueryParams: (
    queryParams: Params,
  ) => PaginationQueryParams = (queryParams: Params) => {
    const page: number =
      queryParams['page'] && !isNaN(+queryParams['page'])
        ? +queryParams['page']
        : 1;

    const limit: number =
      queryParams['limit'] && !isNaN(+queryParams['limit'])
        ? +queryParams['limit']
        : ApiModel.DEFAULT_PAGE_SIZE;

    const sortField: string = queryParams['sortField'] || null;

    const sortDir: ApiModel.SORT_DIR = [
      ApiModel.SORT_DIR.ASC,
      ApiModel.SORT_DIR.DESC,
    ].includes(queryParams['sortDir'])
      ? queryParams['sortDir']
      : null;

    const paginationQueryParams: ApiModel.PaginationQueryParams = {
      _start: `${(page - 1) * limit}`,
      _limit: `${limit}`,
      ...(sortField && sortDir
        ? {
            sortField,
            sortDir,
          }
        : null),
    };

    return paginationQueryParams;
  };
}
