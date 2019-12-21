import { OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import {
  ActivatedRoute,
  Event,
  NavigationEnd,
  NavigationStart,
  Params,
  Router,
} from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiModel } from './api.model';

export abstract class AbstractListComponent<T> implements OnInit, OnDestroy {
  private _subscription: Subscription = new Subscription();
  readonly pageSizeOptions: number[] = ApiModel.PAGE_SIZE_OPTIONS;

  listData$: Observable<ApiModel.ListResponse<Readonly<T>>>;

  page: number = 1;
  pageSize: number = ApiModel.DEFAULT_PAGE_SIZE;
  sortField: keyof T;
  sortDirection: ApiModel.SORT_DIR = ApiModel.SORT_DIR.ASC;
  filtersData: Params;
  loading: boolean;

  get pageIndex(): number {
    return this.page - 1;
  }

  constructor(
    protected readonly _activatedRoute: ActivatedRoute,
    protected readonly _router: Router,
  ) {}

  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe(
      this._queryParamsChangeHandler.bind(this),
    );

    this._router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.loading = true;
        return;
      }

      if (event instanceof NavigationEnd) {
        this.loading = false;
      }
    });

    this.listData$ = this._activatedRoute.data.pipe(
      map(
        (data: { listData: ApiModel.ListResponse<Readonly<T>> }) =>
          data.listData,
      ),
    );
  }

  private _queryParamsChangeHandler({
    page,
    limit,
    sortField,
    sortDir,
    ...filterParams
  }: Params): void {
    this.page = (page ? +page : null) || 1;
    this.pageSize = (limit ? +limit : null) || ApiModel.DEFAULT_PAGE_SIZE;

    this.sortDirection = [
      ApiModel.SORT_DIR.ASC,
      ApiModel.SORT_DIR.DESC,
    ].includes(sortDir)
      ? sortDir
      : null;
    this.sortField = sortField || null; // cast empty string to null

    this.filtersData = filterParams;
  }

  filtersDataChangeHandler(filtersData: Params): void {
    this.filtersData = filtersData;
    this._reloadData();
  }

  paginatorChangeHandler(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this._reloadData();
  }

  sortChangeHandler(event: Sort): void {
    this.sortField = (event.active as keyof T) || null;
    this.sortDirection = (event.direction as ApiModel.SORT_DIR) || null; // casting empty string to null

    this._reloadData();
  }

  protected _reloadData(): void {
    const newQueryParams: Params = {
      ...(this.page && this.page !== 1 ? { page: this.page } : null),
      ...(this.pageSize && this.pageSize !== ApiModel.DEFAULT_PAGE_SIZE
        ? { limit: this.pageSize }
        : null),
      ...(this.filtersData || {}),

      ...(this.sortField && this.sortDirection
        ? {
            sortField: this.sortField,
            sortDir: this.sortDirection,
          }
        : null),
    };

    this._router.navigate([], {
      relativeTo: this._activatedRoute,
      queryParams: newQueryParams,
      preserveFragment: true,
    });
  }

  getOrdinalNumber(index: number): number {
    return index + 1 + (this.page - 1) * this.pageSize;
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
