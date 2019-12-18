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
}
