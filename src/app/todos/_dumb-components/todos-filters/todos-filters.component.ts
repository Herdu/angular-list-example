import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Params } from '@angular/router';
import { TodosModel } from '../../models/todos.model';

@Component({
  selector: 'app-todos-filters',
  templateUrl: './todos-filters.component.html',
  styleUrls: ['./todos-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosFiltersComponent implements OnChanges {
  @Input() filtersData: Params;
  @Output() readonly filtersDataChanged: EventEmitter<
    TodosModel.TodosListFilters
  > = new EventEmitter<TodosModel.TodosListFilters>();

  formGroup: FormGroup;

  readonly completeOptions: { name: string; value: string }[] = [
    {
      name: 'Wykonane',
      value: 'true',
    },
    {
      name: 'Do wykonania',
      value: 'false',
    },
  ];

  constructor(private readonly _formBuilder: FormBuilder) {
    this._initForm();
  }

  private _initForm(): void {
    this.formGroup = this._formBuilder.group({
      userId: null,
      completed: null,
      title: null,
    });
  }

  ngOnChanges(simpleChanges: SimpleChanges): void {
    if (simpleChanges.filtersData) {
      this._setFormGroupValue();
    }
  }

  private _setFormGroupValue(): void {
    const data: Params = this.filtersData;

    this.formGroup.patchValue({
      userId: data ? data.userId : null,
      completed:
        data && ['true', 'false'].includes(data.completed)
          ? data.completed
          : null,
      title: data ? data.title : null,
    });
  }

  submitHandler(): void {
    if (this.formGroup.valid) {
      // eliminating empty query parameters
      const formValue: Params = this.formGroup.value;
      const todosListFilters: TodosModel.TodosListFilters = {
        ...(formValue.completed ? { completed: formValue.completed } : null),
        ...(formValue.userId ? { userId: formValue.userId } : null),
        ...(formValue.title ? { title: formValue.title } : null),
      };

      this.filtersDataChanged.emit(todosListFilters);
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

  clearHandler(): void {
    this.formGroup.reset();
    this.formGroup.markAsUntouched();
    this.submitHandler();
  }

  getControl(path: string): AbstractControl {
    return this.formGroup.get(path);
  }
}
