import { ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
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
    protected readonly _changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe(
      this._queryParamsChangeHandler.bind(this),
    );

    this._router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.loading = true;
        this._changeDetectorRef.detectChanges();
        return;
      }

      if (event instanceof NavigationEnd) {
        this.loading = false;
        this._changeDetectorRef.detectChanges();
      }
    });

    this.listData$ = this._activatedRoute.data.pipe(
      map(
        (data: { listData: ApiModel.ListResponse<Readonly<T>> }) =>
          data.listData,
      ),
    );
  }

  private _queryParamsChangeHandler(queryParams: Params): void {
    this.page = (queryParams['page'] ? +queryParams['page'] : null) || 1;
    this.pageSize =
      (queryParams['limit'] ? +queryParams['limit'] : null) ||
      ApiModel.DEFAULT_PAGE_SIZE;
  }

  filtersChangeHandler(filtersData: Params): void {
    this.filtersData = filtersData;

    this._reloadData();
  }

  paginatorChangeHandler(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this._reloadData();
  }

  protected _reloadData(): void {
    const newQueryParams: Params = {
      ...(this.page && this.page !== 1 ? { page: this.page } : null),
      ...(this.pageSize && this.pageSize !== ApiModel.DEFAULT_PAGE_SIZE
        ? { limit: this.pageSize }
        : null),
      ...(this.filtersData || {}),
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
